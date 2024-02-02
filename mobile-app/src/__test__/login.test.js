import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "../components/User";
import "@testing-library/jest-dom";
import RouterComponent from "../Route";
import App from "../App";
import DashboardWrapper from "../components/Dashboard/dashContext";

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
describe("Login Page Test", () => {
  test("login ", async () => {
    render(
      <DashboardWrapper>
        <Router>
          <Login />
        </Router>
      </DashboardWrapper>
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("form", { name: "login form" })
    ).toBeInTheDocument();
  });


  test("login ", async () => {
    render(
      <DashboardWrapper>
        <Router>
          <Login />
        </Router>
      </DashboardWrapper>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();

    });
  });

   test("login ", async () => {
    render(
      <DashboardWrapper>
        <Router>
          <Login />
        </Router>
      </DashboardWrapper>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();

    });
  });
  test("login ", async () => {
    render(
      <DashboardWrapper>
        <RouterComponent />
      </DashboardWrapper>
        );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(
      screen.getByRole("form", { name: "login form" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Log in"));
    
  });
  test("renders welcome message", () => {
    render(<App />);
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });
  test("login ", async () => {
    render(
      <DashboardWrapper>
        <Router>
          <Login />
        </Router>
      </DashboardWrapper>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "pranjhisingh2208@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText("Log in"));
    
    await waitFor(() => {
      expect(screen.getByText("Login Successful")).toBeInTheDocument();

    });
    // expect(await screen.findByText("Brand")).toBeInTheDocument();
    await waitFor(() => {
      expect(window.location.pathname).toBe("/dashboard");
    });
    

  });
  
});
