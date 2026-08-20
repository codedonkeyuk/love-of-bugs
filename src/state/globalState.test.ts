import { describe, it, expect } from "vitest";
import { globalState, nextMessage } from "./globalState";

describe("Global State Manager", () => {
  it("manages the entire announcement and bug activation lifecycle sequentially", () => {
    expect(globalState.message).toBe("");
    expect(globalState.finished).toBe(false);
    expect(globalState.bugs.ladybug).toBe(false);
    expect(globalState.bugs.bee).toBe(false);
    expect(globalState.bugs.butterfly).toBe(false);

    nextMessage();
    expect(globalState.message).toBe("A tiny red beetle out on a climb...");
    expect(globalState.bugs.ladybug).toBe(true);
    expect(globalState.bugs.bee).toBe(false);

    nextMessage();
    expect(globalState.message).toBe(
      "A fuzzy gold worker who buzzes in time...",
    );
    expect(globalState.bugs.bee).toBe(true);
    expect(globalState.bugs.butterfly).toBe(false);

    nextMessage();
    expect(globalState.message).toBe(
      "A bright splash of colour that floats in the sun...",
    );
    expect(globalState.bugs.butterfly).toBe(true);
    expect(globalState.finished).toBe(false);

    nextMessage();
    expect(globalState.message).toBe(
      "The garden is waking, and spring has begun!",
    );
    expect(globalState.finished).toBe(false);

    nextMessage();
    expect(globalState.message).toBe("Welcome to Bug Box");
    expect(globalState.finished).toBe(true);

    const finalMsg = globalState.message;
    nextMessage();
    expect(globalState.message).toBe(finalMsg);
    expect(globalState.finished).toBe(true);
  });
});
