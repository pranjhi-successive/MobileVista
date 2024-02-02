import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorDetail from "../modules/mobiles/Uploads/ErrorDetail";
import axios from "axios";

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
describe("error detail Page Test", () => {
  test("API call error", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});

    render(<ErrorDetail />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
  test("Table rendering - no errors", async () => {
    const apiResponse = {
      data: {
        data: [],
      },
    };
    jest.spyOn(axios, "get").mockResolvedValue(apiResponse);

    render(<ErrorDetail />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.queryByText("Error Details")).toBeInTheDocument();
      expect(screen.queryByRole("table")).toBeInTheDocument();
    });
    
  });
});
