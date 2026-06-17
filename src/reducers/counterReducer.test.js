import deepFreeze from "deep-freeze";
import { describe, expect, test } from "vitest";
import counterReducer from "./counterReducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  test("GOOD increments good", () => {
    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, {
      type: "GOOD",
    });

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });

    expect(state).toEqual(initialState);
    expect(newState).not.toBe(state);
  });

  test("OK increments ok", () => {
    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, {
      type: "OK",
    });

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });

    expect(state).toEqual(initialState);
    expect(newState).not.toBe(state);
  });

  test("BAD increments bad", () => {
    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, {
      type: "BAD",
    });

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });

    expect(state).toEqual(initialState);
    expect(newState).not.toBe(state);
  });

  test("RESET returns initial state", () => {
    const state = {
      good: 5,
      ok: 2,
      bad: 1,
    };

    deepFreeze(state);

    const newState = counterReducer(state, {
      type: "RESET",
    });

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });

    expect(state).toEqual({
      good: 5,
      ok: 2,
      bad: 1,
    });
  });
});
