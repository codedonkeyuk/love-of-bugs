import { reactive } from "vue";

interface BugState {
  ladybug: boolean;
  bee: boolean;
  butterfly: boolean;
  siteButton: boolean;
}

interface ConfigItem {
  message: string;
  bug?: keyof BugState;
}

const config: ConfigItem[] = [
  { message: "A tiny red beetle out on a climb...", bug: "ladybug" },
  { message: "A fuzzy gold worker who buzzes in time...", bug: "bee" },
  {
    message: "A bright splash of colour that floats in the sun...",
    bug: "butterfly",
  },
  { message: "The garden is waking, and spring has begun!" },
  {
    message: "Welcome to the Love of Bugs",
  },
];

let messageIndex = -1;

export const globalState = reactive({
  bugs: { ladybug: false, bee: false, butterfly: false } as BugState,
  message: "",
  finished: false,
});

export function nextMessage() {
  messageIndex++;
  if (messageIndex < config.length) {
    const currentItem = config[messageIndex];
    globalState.message = currentItem.message;
    if (currentItem.bug) {
      globalState.bugs[currentItem.bug] = true;
    }
    if (messageIndex === config.length - 1) {
      globalState.finished = true;
    }
  }
}

export function skipContent() {
  const lastItm = config.length - 2;
  for (let i = messageIndex; i < lastItm; i++) {
    const item = config[i];
    if (item.bug) {
      globalState.bugs[item.bug] = true;
    }
  }
  messageIndex = lastItm;
  nextMessage();
}
