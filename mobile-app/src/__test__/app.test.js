import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";

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
    render(<App />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "pranjhisingh2208@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText("Log in"));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/dashboard");
    });
    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(await screen.findByText("Upload")).toBeInTheDocument();
    expect(await screen.findByText("Login")).toBeInTheDocument();
    const mobile = await screen.findByText("Mobiles");
    expect(mobile).toBeInTheDocument();
    fireEvent.click(mobile);
    expect(await screen.findByText("Mobile List")).toBeInTheDocument();
    // window.location.reload();

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
    const editElements = screen.getByTestId("edit-icon-0");
    expect(editElements).toBeInTheDocument();
    fireEvent.click(editElements);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/edit/65b0ac459c9853912fc030ba");
    });


    const brandInput = screen.getByLabelText("Brand");
    expect(brandInput).toBeInTheDocument();

    expect(await screen.getByText("Edit Mobile Data")).toBeInTheDocument();


    fireEvent.change(brandInput, { target: { value: "Samsung" } });
    const submit = screen.getByText("Update Mobile");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);


    screen.debug(undefined, 999999);
  });
});
