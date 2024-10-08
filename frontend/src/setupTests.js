import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { resolve } from "path";

vi.mock("zustand", async () => {
  const mod = await vi.importActual(resolve("__mocks__/zustand.js"));
  return /** @type {import("zustand")} */ mod;
}); // to make it work like Jest (auto-mocking)
afterEach(() => {
  cleanup();
});
