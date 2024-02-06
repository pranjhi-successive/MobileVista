import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthWrapper } from "../modules/User/Authentication";
import PublicRoute from "../Routes/authRoutes/publicRoutes";
import Dashboard from "../modules/Dashboard/Dashboard";
import DashboardWrapper from "../modules/Dashboard/DashContext";

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
  test("should render a Layout component with a Menu and a Switch inside", async () => {
    await act(async () => {
      render(
        <Router>
          <DashboardWrapper>
            <AuthWrapper>
              <PublicRoute>
                <Dashboard />
              </PublicRoute>
            </AuthWrapper>
          </DashboardWrapper>
        </Router>
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  test("should display Home, Mobiles, Uploads, and Login in the Menu component", async () => {
    await act(() => {
      render(
        <Router>
          <DashboardWrapper>
            <AuthWrapper>
              <PublicRoute>
                <Dashboard />
              </PublicRoute>
            </AuthWrapper>
          </DashboardWrapper>
        </Router>
      );
    });
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(4);
    expect(menuItems[0]).toHaveTextContent("Home");
    expect(menuItems[1]).toHaveTextContent("Mobiles");
    expect(menuItems[2]).toHaveTextContent("Upload");
    expect(menuItems[3]).toHaveTextContent("Login");
  });
  test("should highlight the selected item in the Menu component", async () => {
    await act(() => {
      render(
        <Router>
          <DashboardWrapper>
            <AuthWrapper>
              <PublicRoute>
                <Dashboard />
              </PublicRoute>
            </AuthWrapper>
          </DashboardWrapper>
        </Router>
      );
    });
    const menuItems = screen.getAllByRole("menuitem");
    fireEvent.click(menuItems[1]);
    expect(menuItems[1]).toHaveClass("ant-menu-item-selected");
  });
  test("should toggle the Switch component when the label is clicked", async () => {
    await act(() => {
      render(
        <Router>
          <DashboardWrapper>
            <AuthWrapper>
              <PublicRoute>
                <Dashboard />
              </PublicRoute>
            </AuthWrapper>
          </DashboardWrapper>
        </Router>
      );
    });
    const switchLabel = screen.getByTestId("theme-switch");
    fireEvent.click(switchLabel);
    expect(screen.getByText("Dark")).toBeInTheDocument();
    fireEvent.click(switchLabel);

    expect(screen.getByText("Light")).toBeInTheDocument();
  });
});
