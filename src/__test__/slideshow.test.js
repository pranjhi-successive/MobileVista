import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Slideshow from "../modules/Dashboard/Slideshow";
import { act } from "react-dom/test-utils";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
describe("slideshow Page Test", () => {
  test("Initial  test", async () => {
    await act(() => {
      render(<Slideshow />);
    });
    expect(screen.getByText("MOBILE VIESTA")).toBeInTheDocument();
  });
});
