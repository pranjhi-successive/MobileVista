import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import MobileDetails from "../modules/mobiles/ShowDetails/ShowDetail";
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
describe("Details Test", () => {
  test("details ", async () => {
    await act(()=>{

      render(
        <Router>
        <MobileDetails/>
      </Router>
    );
  })
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Display")).toBeInTheDocument();
    expect(screen.getByText("Camera")).toBeInTheDocument();
    expect(screen.getByText("Processor")).toBeInTheDocument();
    expect(screen.getByText("Storage")).toBeInTheDocument();
    expect(screen.getByText("Realease Date")).toBeInTheDocument();
    expect(screen.getByText("Battery Capacity")).toBeInTheDocument();
    expect(screen.getByText("Operating System")).toBeInTheDocument();
    expect(screen.getByText("Water Resistant")).toBeInTheDocument();
    expect(screen.getByText("Connectivity:")).toBeInTheDocument();
    expect(screen.getByText("Wi-Fi :")).toBeInTheDocument();
    expect(screen.getByText("Bluetooth :")).toBeInTheDocument();
    expect(screen.getByText("Cellular :")).toBeInTheDocument();
    expect(screen.getByText("Rating:")).toBeInTheDocument();
    expect(screen.getByText("Invalid Date")).toBeInTheDocument();
    expect(screen.getByText("Specifications:")).toBeInTheDocument();
    expect(screen.getByText("Preview")).toBeInTheDocument();
    
  });
  
 
  test("display 'No' for mobile weight", async () => {
    render(
      <Router>
        <MobileDetails/>
      </Router>
    );
    expect(screen.queryByText("Weight:")).toBeNull();
  });
  test("check console log on error", async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});
  
    render(
      <Router>
        <MobileDetails/>
      </Router>
    );
  
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('helloooooooo');
    });
  
    consoleSpy.mockRestore();
  });
});
