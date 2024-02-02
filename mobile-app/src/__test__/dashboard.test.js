import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Items, { LazyCardImage } from "../modules/mobiles/MobileListing/Items";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Listing } from "../modules/mobiles";
import { Dashboard } from "../components";
import { DashboardWrapper } from "../components/Dashboard";
import { DashboardContext } from "../components/Dashboard/dashContext";
import App from "../App";
import { useMemo, useState } from "react";

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
  test("should render a Layout component with a Menu and a Switch inside", () => {
    render(
      <Router>
        <DashboardWrapper>
          <Dashboard />
        </DashboardWrapper>
      </Router>
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  test("should display Home, Mobiles, Uploads, and Login in the Menu component", () => {
    render(
      <Router>
        <DashboardWrapper>
          <Dashboard />
        </DashboardWrapper>
      </Router>
    );
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(4);
    expect(menuItems[0]).toHaveTextContent("Home");
    expect(menuItems[1]).toHaveTextContent("Mobiles");
    expect(menuItems[2]).toHaveTextContent("Upload");
    expect(menuItems[3]).toHaveTextContent("Login");
  });
  test('should highlight the selected item in the Menu component', () => {
    render(<Router>
        <DashboardWrapper>
          <Dashboard />
        </DashboardWrapper>
      </Router>);
    const menuItems = screen.getAllByRole('menuitem');
    fireEvent.click(menuItems[1]);
    expect(menuItems[1]).toHaveClass('ant-menu-item-selected');
  });
  test('should toggle the Switch component when the label is clicked', () => {
    render(
      <Router>
        <DashboardWrapper>
          <Dashboard />
        </DashboardWrapper>
      </Router>
    );
    const switchLabel = screen.getByTestId('theme-switch');
    fireEvent.click(switchLabel);
    expect(screen.getByText("Dark")).toBeInTheDocument();
    fireEvent.click(switchLabel);

    expect(screen.getByText("Light")).toBeInTheDocument();
  });
});
