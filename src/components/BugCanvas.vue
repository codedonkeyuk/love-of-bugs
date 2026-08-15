<template>
  <div ref="sceneContainer" class="petri-dish-scene">
    <div ref="canvasContainer" class="petri-dish-basin"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as PIXI from "pixi.js";
import { bugImageModules } from "../data/Bugs";

interface BugCanvasProps {
  size?: string;
  bugSvgUrl: string;
  bugCount?: number;
  label?: string;
}

const props = withDefaults(defineProps<BugCanvasProps>(), {
  size: "300px",
  bugCount: 5,
});

const sceneContainer = ref<HTMLDivElement | null>(null);
const canvasContainer = ref<HTMLDivElement | null>(null);

let app: PIXI.Application | null = null;
let observer: IntersectionObserver | null = null;

interface InteractiveBug extends PIXI.AnimatedSprite {
  currentState: "STILL" | "WANDER" | "PANIC";
  speed: number;
  direction: number;
  panicTimeoutId: number | null;
}

let allBugs: InteractiveBug[] = [];

const WANDER_SPEED = 1.0;
const PANIC_SPEED = 5.0;
const PANIC_DURATION = 3500;
const DETECTION_RADIUS = 100;
const SCROLL_VELOCITY_THRESHOLD = 8;

let behaviorIntervalId: number | null = null;
const mousePos = { x: -9999, y: -9999 };
let lastScrollY = window.scrollY;
let isCurrentlyVisible = false;

const triggerBugPanic = (targetBug: InteractiveBug, customAngle?: number) => {
  targetBug.currentState = "PANIC";
  targetBug.speed = PANIC_SPEED;
  targetBug.play();

  targetBug.direction =
    customAngle !== undefined ? customAngle : Math.random() * Math.PI * 2;

  if (targetBug.panicTimeoutId !== null) clearTimeout(targetBug.panicTimeoutId);

  targetBug.panicTimeoutId = window.setTimeout(() => {
    targetBug.currentState = "STILL";
    targetBug.speed = 0;
    targetBug.stop();
    targetBug.panicTimeoutId = null;
  }, PANIC_DURATION);
};

const decideAllNextActions = () => {
  if (!isCurrentlyVisible) return; // Prevent hidden computations

  allBugs.forEach((targetBug) => {
    if (targetBug.currentState === "PANIC") return;

    if (Math.random() < 0.65) {
      targetBug.currentState = "STILL";
      targetBug.speed = 0;
      targetBug.stop();
    } else {
      targetBug.currentState = "WANDER";
      targetBug.speed = WANDER_SPEED;
      targetBug.play();
      targetBug.direction = Math.random() * Math.PI * 2;
    }
  });
};

const handlePageScroll = () => {
  if (!isCurrentlyVisible) {
    lastScrollY = window.scrollY;
    return;
  }

  const currentScrollY = window.scrollY;
  const scrollVelocity = Math.abs(currentScrollY - lastScrollY);
  lastScrollY = currentScrollY;

  if (scrollVelocity > SCROLL_VELOCITY_THRESHOLD) {
    allBugs.forEach((targetBug) => triggerBugPanic(targetBug));
  }
};

const updateBugLoop = (ticker: PIXI.Ticker) => {
  if (!app) return; // Completely drop the variable flag here for isolation

  // Force actual DOM offset checks if screen bounds dropped to 0 on iPad load
  const boxWidth =
    app.screen.width > 0
      ? app.screen.width
      : canvasContainer.value?.clientWidth || 300;
  const boxHeight =
    app.screen.height > 0
      ? app.screen.height
      : canvasContainer.value?.clientHeight || 300;

  const delta = ticker.deltaTime || 1.0;

  allBugs.forEach((targetBug) => {
    const mDx = targetBug.x - mousePos.x;
    const mDy = targetBug.y - mousePos.y;
    const mDistance = Math.sqrt(mDx * mDx + mDy * mDy);

    if (mDistance < DETECTION_RADIUS && targetBug.currentState !== "PANIC") {
      triggerBugPanic(targetBug, Math.atan2(mDy, mDx));
    }

    if (targetBug.currentState === "STILL") return;

    if (targetBug.currentState === "WANDER" && Math.random() < 0.05) {
      targetBug.direction += (Math.random() - 0.5) * 0.5;
    }
    if (targetBug.currentState === "PANIC" && Math.random() < 0.08) {
      targetBug.direction += (Math.random() - 0.5) * 1.5;
    }

    // Apply movement variables
    targetBug.x += Math.cos(targetBug.direction) * targetBug.speed * delta;
    targetBug.y += Math.sin(targetBug.direction) * targetBug.speed * delta;
    targetBug.rotation = targetBug.direction;

    const bugRadius =
      (targetBug.width > 0 ? Math.max(targetBug.width, targetBug.height) : 40) /
      2;

    // Direct bounce logic
    if (targetBug.x < bugRadius) {
      targetBug.x = bugRadius;
      targetBug.direction = Math.PI - targetBug.direction;
    } else if (targetBug.x > boxWidth - bugRadius) {
      targetBug.x = boxWidth - bugRadius;
      targetBug.direction = Math.PI - targetBug.direction;
    }

    if (targetBug.y < bugRadius) {
      targetBug.y = bugRadius;
      targetBug.direction = -targetBug.direction;
    } else if (targetBug.y > boxHeight - bugRadius) {
      targetBug.y = boxHeight - bugRadius;
      targetBug.direction = -targetBug.direction;
    }
  });
};

onMounted(() => {
  requestAnimationFrame(async () => {
    if (!canvasContainer.value || !sceneContainer.value) return;

    const rect = canvasContainer.value.getBoundingClientRect();
    app = new PIXI.Application();

    await app.init({
      width: rect.width,
      height: rect.height,
      backgroundAlpha: 0,
      antialias: true,
    });

    if (!canvasContainer.value || !app.canvas) return;
    canvasContainer.value.appendChild(app.canvas);

    // Fix 1: Force Pixi's Shared Ticker to continue running even if Safari
    // flags the Canvas tab context as throttled or idle.
    PIXI.Ticker.shared.autoStart = true;

    // Fix 2: Force the app ticker to wake up from Safari's paint engine locks
    app.ticker.start();

    try {
      const imageLoader = bugImageModules[props.bugSvgUrl];
      let finalAssetSource = props.bugSvgUrl;

      if (imageLoader) {
        const module = (await imageLoader()) as { default: string };
        finalAssetSource = module.default;
      }

      const texture = await PIXI.Assets.load<PIXI.Texture>(finalAssetSource);

      const TOTAL_FRAMES = 4;
      const FRAME_WIDTH = texture.width / TOTAL_FRAMES;
      const FRAME_HEIGHT = texture.height;
      const walkFrames: PIXI.Texture[] = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const frameRectangle = new PIXI.Rectangle(
          i * FRAME_WIDTH,
          0,
          FRAME_WIDTH,
          FRAME_HEIGHT,
        );
        const textureFrame = new PIXI.Texture({
          source: texture.source,
          frame: frameRectangle,
        });
        walkFrames.push(textureFrame);
      }

      const boxWidth = app.screen.width;
      const boxHeight = app.screen.height;

      for (let i = 0; i < props.bugCount; i++) {
        const sprite = new PIXI.AnimatedSprite(walkFrames) as InteractiveBug;
        sprite.anchor.set(0.5);

        const bugRadius = Math.max(FRAME_WIDTH, FRAME_HEIGHT) / 2;
        const spawnMargin = bugRadius + 15;

        sprite.x = spawnMargin + Math.random() * (boxWidth - spawnMargin * 2);
        sprite.y = spawnMargin + Math.random() * (boxHeight - spawnMargin * 2);

        sprite.currentState = "STILL";
        sprite.speed = 0;
        sprite.direction = Math.random() * Math.PI * 2;
        sprite.panicTimeoutId = null;
        sprite.animationSpeed = 0.15;
        sprite.gotoAndStop(Math.floor(Math.random() * TOTAL_FRAMES));

        sprite.eventMode = "static";
        sprite.cursor = "pointer";
        sprite.on("pointerdown", (event) => {
          event.stopPropagation();
          triggerBugPanic(sprite);
        });

        app.stage.addChild(sprite);
        allBugs.push(sprite);
      }

      app.stage.eventMode = "static";
      app.stage.hitArea = app.screen;
      app.stage.on("pointermove", (event) => {
        mousePos.x = event.global.x;
        mousePos.y = event.global.y;
      });

      // Fix 3: Map 'touchmove' as an alias for tracking coordinates on Mobile layouts.
      // Mobile Safari doesn't trigger standard "pointermove" consistently if it thinks the canvas is frozen.
      app.stage.on("touchmove", (event) => {
        mousePos.x = event.global.x;
        mousePos.y = event.global.y;
      });

      app.stage.on("pointerleave", () => {
        mousePos.x = -9999;
        mousePos.y = -9999;
      });

      app.ticker.add(updateBugLoop);
      behaviorIntervalId = window.setInterval(decideAllNextActions, 1500);

      window.addEventListener("scroll", handlePageScroll, { passive: true });

      // Fix 4: To accommodate Mobile Safari constraints, remove the ticker.stop() command
      // from the IntersectionObserver. Let the loop stay running, and rely strictly on
      // our local conditional gate flag to save memory processing loops.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!app) return;
            if (entry.isIntersecting) {
              isCurrentlyVisible = true;
              // Wake ticker loop up safely
              app.ticker.start();
              PIXI.Ticker.shared.start();
            } else {
              isCurrentlyVisible = false;
            }
          });
        },
        { root: null, threshold: 0.1 },
      );

      observer.observe(sceneContainer.value);
    } catch (error) {
      console.error("PixiJS initialization error:", error);
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handlePageScroll);

  if (observer && sceneContainer.value) {
    observer.unobserve(sceneContainer.value);
    observer.disconnect();
  }

  if (behaviorIntervalId !== null) clearInterval(behaviorIntervalId);

  allBugs.forEach((targetBug) => {
    if (targetBug.panicTimeoutId !== null)
      clearTimeout(targetBug.panicTimeoutId);
  });

  if (app) {
    app.ticker.remove(updateBugLoop);
    app.destroy(true, { children: true, texture: true });
    app = null;
    allBugs = [];
  }
});
</script>

<style scoped>
.petri-dish-scene {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.petri-dish-rim {
  overflow: hidden;
}
.petri-dish-basin {
  z-index: 1000;
  position: absolute;
  top: 70px;
  bottom: 60px;
  left: 60px;
  right: 57px;
}
</style>
