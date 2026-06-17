import deepFreeze from "deep-freeze";
import { describe, expect, test } from "vitest";
import counterReducer from "./counterReducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  const actionGood = { type: "GOOD" };
  const actionOk = { type: "OK" };
  const actionBad = { type: "BAD" };
  const actionReset = { type: "RESET" };

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, actionGood);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("testing actions", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, actionGood);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });

    deepFreeze(newState);
    const newState2 = counterReducer(newState, actionBad);
    expect(newState2).toEqual({
      good: 1,
      ok: 0,
      bad: 1,
    });

    deepFreeze(newState2);
    const newState3 = counterReducer(newState2, actionOk);
    expect(newState3).toEqual({
      good: 1,
      ok: 1,
      bad: 1,
    });

    deepFreeze(newState3);
    const reset = counterReducer(newState3, actionReset);
    expect(reset).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});
