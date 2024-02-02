
import "@testing-library/jest-dom";
import {  render, screen } from "@testing-library/react";
import React from "react";
import RouterComponent from "../Route";
import Slideshow from "../components/Dashboard/Slideshow";
 
Object.defineProperty(window, 'matchMedia', {
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
  })
});
describe("slideshow Page Test", () => {
    test("Initial  test", async () => {
      render(<Slideshow />)
      expect(screen.getByText("MOBILE VIESTA")).toBeInTheDocument();
      
      
    });
    
});  