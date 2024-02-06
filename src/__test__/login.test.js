import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { Login } from "../modules/User";
import DashboardWrapper from "../modules/Dashboard/DashContext";
import RouterComponent from "../Routes/Route";
import { AuthWrapper } from "../modules/User/Authentication";
import { act } from "react-dom/test-utils";
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
describe("Login Page Test", () => {
  test("login ", async () => {
    await act(() => {
      render(
        <DashboardWrapper>
          <AuthWrapper>
            <Router>
              <Login />
            </Router>
          </AuthWrapper>
        </DashboardWrapper>
      );
    });
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("form", { name: "login form" })
    ).toBeInTheDocument();
  });

  test("login ", async () => {
    await act(() => {
      render(
        <DashboardWrapper>
          <AuthWrapper>
            <Router>
              <Login />
            </Router>
          </AuthWrapper>
        </DashboardWrapper>
      );
    });

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
    await act(() => {
      render(
        <DashboardWrapper>
          <AuthWrapper>
            <Router>
              <Login />
            </Router>
          </AuthWrapper>
        </DashboardWrapper>
      );
    });

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
        <AuthWrapper>

        <RouterComponent />
        </AuthWrapper>
      </DashboardWrapper>
        );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(
      screen.getByRole("form", { name: "login form" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Log in"));

  });
  test("renders welcome message", async() => {
    await act(()=>{

      render(<App />);
    })
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });
  test("login ", async () => {
    await act(() => {
      render(
        <DashboardWrapper>
          <AuthWrapper>
            <Router>
              <Login />
            </Router>
          </AuthWrapper>
        </DashboardWrapper>
      );
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "pranjhisingh2208@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Pass@123" },
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
