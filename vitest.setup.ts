import "@testing-library/jest-dom/vitest";
import { afterAll, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});
