import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ErrorPage } from "../components";
import { BrowserRouter as Router  } from "react-router-dom";

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

describe("MObileListing Page Test", () => {
  test("Initial Labels test", async () => {
    render(
    <Router>
    <ErrorPage />
    </Router>)
    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();
    const errorTitle = screen.getByText("404 Not Found");
    const subTitle = screen.getByText("Oops! It looks like the page you are looking for does not exist.");
    const linkToHomepage = screen.getByRole("link", { name: "homepage" });
    const backButton = screen.getByRole("button", { name: "Back to Homepage" });

    expect(errorTitle).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(linkToHomepage).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    
  });
});
