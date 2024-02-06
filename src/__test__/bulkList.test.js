import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Bulk from "../modules/mobiles/Uploads/bulk";
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

// jest.mock("axios");
// const setLogin = jest.fn();

describe("Testing BulkList Page", () => {
  // const mockUserAuthValue = {
  //   login: true,
  // };
  test("Testing BUlkList Page correctly rendering or not", async () => {
    await act(async () => {
      render(<Bulk />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Click or drag file to this area to upload")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      const viewErrors = screen.getAllByText("View Errors");
      expect(viewErrors.length).toBeGreaterThanOrEqual(0);
    });
    screen.debug(undefined, 99999);
  });
});
