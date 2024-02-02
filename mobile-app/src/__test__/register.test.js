import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Register } from "../components/User";
import "@testing-library/jest-dom";

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
describe("register Page Test", () => {
  test("register ", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(
      screen.getByRole("form", { name: "register form" })
    ).toBeInTheDocument();
  });
  test("renders the name input field", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
  });
  test("submits the register form successfully", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const phoneInput = screen.getByLabelText("Phone Number");
    const streetInput = screen.getByLabelText("Street");
    const cityInput = screen.getByLabelText("City");
    const stateInput = screen.getByLabelText("State");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe")
    fireEvent.change(emailInput, { target: { value: "joh.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password12" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password12" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(streetInput, { target: { value: "123 Main St" } });
    fireEvent.change(cityInput, { target: { value: "New York" } });
    fireEvent.change(stateInput, { target: { value: "NY" } });

    const submitButton = screen.getByRole("button", { name: "register" });
    fireEvent.click(submitButton);

    // await waitFor(() => {
      expect(await screen.findByText("Registration successful! You can now log in.")).toBeInTheDocument();
    // });
    fireEvent.click(submitButton);
    expect(await screen.findByText("user exist already")).toBeInTheDocument();

  });

  test("submits the register form successfully", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const phoneInput = screen.getByLabelText("Phone Number");
    const streetInput = screen.getByLabelText("Street");
    const cityInput = screen.getByLabelText("City");
    const stateInput = screen.getByLabelText("State");

    fireEvent.change(nameInput, { target: { value: "Johntet3 Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "pword123" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(streetInput, { target: { value: "123 Main St" } });
    fireEvent.change(cityInput, { target: { value: "New York" } });
    fireEvent.change(stateInput, { target: { value: "NY" } });

    const submitButton = screen.getByRole("button", { name: "register" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("The new password that you entered do not match!")).toBeInTheDocument();
    });
  });
  
  test("displays an error message when email is invalid", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const phoneInput = screen.getByLabelText("Phone Number");
    const streetInput = screen.getByLabelText("Street");
    const cityInput = screen.getByLabelText("City");
    const stateInput = screen.getByLabelText("State");

    fireEvent.change(nameInput, { target: { value: "Johntet3 Doe" } });
    fireEvent.change(emailInput, { target: { value: "abd" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(streetInput, { target: { value: "123 Main St" } });
    fireEvent.change(cityInput, { target: { value: "New York" } });
    fireEvent.change(stateInput, { target: { value: "NY" } });

    const submitButton = screen.getByRole("button", { name: "register" });
    fireEvent.click(submitButton);

    // await waitFor(() => {
      expect(await screen.findByText("The input is not valid E-mail!")).toBeInTheDocument();
    // });
  });
});
