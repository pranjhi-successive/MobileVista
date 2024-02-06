import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ErrorPage } from "../components";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorDetail from "../modules/mobiles/Uploads/ErrorDetail";
import BulkUploadList from "../modules/mobiles/Uploads/history";

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

describe("MObileListing Page Test", () => {
  test("Initial Labels test", async () => {
    render(<BulkUploadList fetchHistory={true} />);

    await waitFor(() => {
      expect(screen.getByText("Upload History")).toBeInTheDocument();
    });
    expect(await screen.getByText("left")).toBeInTheDocument();
    expect(await screen.getByText("bottom")).toBeInTheDocument();
    expect(await screen.getByText("right")).toBeInTheDocument();
    expect(await screen.getByText("top")).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText("1")).toBeInTheDocument();
      });

    screen.debug(undefined, 999999);
  });
});
