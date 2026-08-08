<template>
  <div ref="sceneContainer" class="petri-dish-scene">
    <div class="petri-dish-rim">
      <div ref="canvasContainer" class="petri-dish-basin">
        <div class="glass-reflection-shine"></div>
      </div>
    </div>
    <div class="sample-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as PIXI from "pixi.js";

interface BugCanvasProps {
  size?: string;
  bugSvgUrl: string; // IMPORTANT: drawn horizontally, facing directly to the right.
  bugCount?: number;
  label?: string;
}

const props = withDefaults(defineProps<BugCanvasProps>(), {
  size: "450px",
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

let centerX = 0;
let centerY = 0;
let dishRadius = 0;

const updateDishDimensions = () => {
  if (!app) return;
  centerX = app.screen.width / 2;
  centerY = app.screen.height / 2;
  dishRadius = Math.min(app.screen.width, app.screen.height) / 2;
};

const triggerBugPanic = (targetBug: InteractiveBug, customAngle?: number) => {
  targetBug.currentState = "PANIC";
  targetBug.speed = PANIC_SPEED;

  // Start animating legs during panic
  targetBug.play();

  targetBug.direction =
    customAngle !== undefined ? customAngle : Math.random() * Math.PI * 2;

  if (targetBug.panicTimeoutId !== null) clearTimeout(targetBug.panicTimeoutId);

  targetBug.panicTimeoutId = window.setTimeout(() => {
    targetBug.currentState = "STILL";
    targetBug.speed = 0;

    // Stop animating legs when still
    targetBug.stop();

    targetBug.panicTimeoutId = null;
  }, PANIC_DURATION);
};

const decideAllNextActions = () => {
  allBugs.forEach((targetBug) => {
    if (targetBug.currentState === "PANIC") return;

    if (Math.random() < 0.65) {
      targetBug.currentState = "STILL";
      targetBug.speed = 0;

      // Stop animating legs when still
      targetBug.stop();
    } else {
      targetBug.currentState = "WANDER";
      targetBug.speed = WANDER_SPEED;

      // Start animating legs when walking
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
  if (!app) return;
  const delta = ticker.deltaTime;

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

    targetBug.x += Math.cos(targetBug.direction) * targetBug.speed * delta;
    targetBug.y += Math.sin(targetBug.direction) * targetBug.speed * delta;
    targetBug.rotation = targetBug.direction;

    const bDx = targetBug.x - centerX;
    const bDy = targetBug.y - centerY;
    const currentBugDistance = Math.sqrt(bDx * bDx + bDy * bDy);

    const bugRadius = Math.max(targetBug.width, targetBug.height) / 2;
    const maxAllowedDistance = dishRadius - bugRadius;

    if (currentBugDistance > maxAllowedDistance) {
      const wallAngle = Math.atan2(bDy, bDx);
      targetBug.x = centerX + Math.cos(wallAngle) * maxAllowedDistance;
      targetBug.y = centerY + Math.sin(wallAngle) * maxAllowedDistance;
      targetBug.direction = 2 * wallAngle - Math.PI - targetBug.direction;
    }
  });
};

const handleResize = () => {
  if (app && canvasContainer.value) {
    const rect = canvasContainer.value.getBoundingClientRect();
    app.renderer.resize(rect.width, rect.height);
    updateDishDimensions();
  }
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

    try {
      updateDishDimensions();

      const texture = await PIXI.Assets.load<PIXI.Texture>(props.bugSvgUrl);

      // NO HARDCODED NUMBERS: Read sizes directly from your incoming image files
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

      // Clean, pure Vue loops natively tracking props.bugCount directly
      for (let i = 0; i < props.bugCount; i++) {
        const sprite = new PIXI.AnimatedSprite(walkFrames) as InteractiveBug;

        sprite.anchor.set(0.5);

        const spawnRadius = Math.random() * (dishRadius * 0.6);
        const spawnAngle = Math.random() * Math.PI * 2;
        sprite.x = centerX + Math.cos(spawnAngle) * spawnRadius;
        sprite.y = centerY + Math.sin(spawnAngle) * spawnRadius;

        sprite.currentState = "STILL";
        sprite.speed = 0;
        sprite.direction = Math.random() * Math.PI * 2;
        sprite.panicTimeoutId = null;

        // Configure frame animation settings
        sprite.animationSpeed = 0.15;

        // Spawn bugs in a stopped state on a completely random limb frame layout
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
      app.stage.on("pointerleave", () => {
        mousePos.x = -9999;
        mousePos.y = -9999;
      });

      app.ticker.add(updateBugLoop);
      behaviorIntervalId = window.setInterval(decideAllNextActions, 1500);

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handlePageScroll, { passive: true });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!app) return;
            if (entry.isIntersecting) {
              isCurrentlyVisible = true;
              app.ticker.start();
            } else {
              isCurrentlyVisible = false;
              app.ticker.stop();
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
  window.removeEventListener("resize", handleResize);
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
.sample-label {
  margin: 10px;
  padding: 5px;
  background-color: black;
  color: white;
}
.petri-dish-scene {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.petri-dish-rim {
  border: 10px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.petri-dish-basin {
  position: relative;
  width: v-bind("props.size");
  height: v-bind("props.size");
  background: radial-gradient(
    circle,
    rgba(240, 248, 255, 0.1) 0%,
    rgba(200, 220, 240, 0.2) 100%
  );
}
.glass-reflection-shine {
  position: absolute;
  top: 5%;
  left: 10%;
  width: 80%;
  height: 20%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 50% / 100% 100% 0 0;
  pointer-events: none;
}
</style>
