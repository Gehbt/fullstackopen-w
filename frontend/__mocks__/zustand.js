"use strict";
import { act } from "@testing-library/react";
import { afterEach, vi } from "vitest";
const { create: actualCreate, createStore: actualCreateStore } = await vi.importActual("zustand");
export const storeResetFns = /* @__PURE__ */ new Set();
const createUncurried = (stateCreator) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};
export const create = (stateCreator) => {
  console.log("zustand create mock");
  return typeof stateCreator === "function" ? createUncurried(stateCreator) : createUncurried;
};
const createStoreUncurried = (stateCreator) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};
export const createStore = (stateCreator) => {
  console.log("zustand createStore mock");
  return typeof stateCreator === "function" ? createStoreUncurried(stateCreator) : createStoreUncurried;
};
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
