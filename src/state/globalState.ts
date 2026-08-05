import { reactive } from "vue";

interface BugState {
  ladybug: boolean;
  bee: boolean;
  butterfly: boolean;
}

interface ConfigItem {
  message: string;
  bug: keyof BugState;
}

const config: ConfigItem[] = [
  { message: "show a ladybug", bug: "ladybug" },
  { message: "Show a bee", bug: "bee" },
  { message: "Show a butterfly", bug: "butterfly" },
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
    globalState.bugs[currentItem.bug] = true;

    if (messageIndex === config.length - 1) {
      globalState.finished = true;
    }
  }
}
