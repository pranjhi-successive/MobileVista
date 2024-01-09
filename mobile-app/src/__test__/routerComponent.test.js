
import "@testing-library/jest-dom";
import {  act ,fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import RouterComponent, { DashboardContext } from "../Route";
import { Dashboard } from "../components";
import { BrowserRouter as Router  } from "react-router-dom";
 
Object.defineProperty(window, 'matchMedia', {
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
  })
});
describe("MObileListing Page Test", () => {
    test("Initial Labels test", async () => {
      render(<RouterComponent />)
      expect(screen.getByText("Uploads")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Mobile Vista ©2023 Created by Pranjhi Singh")).toBeInTheDocument();
      
    });
    test("switch",()=>{
      const getByRole = render(<RouterComponent />);
      const dashboardSwitch = screen.getByRole('switch');
      expect(dashboardSwitch).toBeInTheDocument();
    });
    test("changeTheme function test", async() => {
      const mockSetTheme = jest.fn();
      const mockSetDashboardSelectedItem = jest.fn();
  
      render(
        <Router>
        <DashboardContext.Provider
          value={{ dashboardSelectedItem: "Home", setDashboardSelectedItem: mockSetDashboardSelectedItem }}
        >
          <Dashboard setTheme={mockSetTheme} />
        </DashboardContext.Provider>
        </Router>
      );
      const themeSwitch = screen.getByRole("switch");
      expect(themeSwitch).toBeInTheDocument();
      expect(themeSwitch).toHaveClass('ant-switch-checked');
      fireEvent.click(themeSwitch);
      fireEvent.click(themeSwitch);
      });
});  