import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "axios";
import { AuthWrapper } from "../modules/User/Authentication";
import Edit from "../modules/mobiles/Edit/Edit";
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
describe("edit Page Test", () => {
  test("should handle API error and display error message", async () => {
    // Mock axios.get to throw an error
    axios.get = jest.fn().mockRejectedValueOnce(new Error("API Error"));

    // Render the component
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <Edit />
          </Router>
        </AuthWrapper>
      );
    });

    expect(screen.getByLabelText("Brand")).toBeInTheDocument();
    expect(screen.getByLabelText("Model Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Color")).toBeInTheDocument();
    expect(screen.getByText("Specifications")).toBeInTheDocument();
    expect(screen.getByLabelText("Release Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Battery Capacity")).toBeInTheDocument();
    expect(screen.getByText("Connectivity")).toBeInTheDocument();
    expect(screen.getByText("Edit Mobile Data")).toBeInTheDocument();
    expect(screen.getByText("Update Mobile")).toBeInTheDocument();
  });
});
