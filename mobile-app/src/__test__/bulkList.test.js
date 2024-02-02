import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import BulkUploadList from "../modules/mobiles/Uploads/history";
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

jest.mock("axios");
const setLogin = jest.fn();

describe("Testing BulkList Page", () => {
  const mockUserAuthValue = {
    login: true,
  };
  test("Testing BUlkList Page correctly rendering or not", () => {
    render(
      <Router>
        <BulkUploadList />
      </Router>
    );
  });

  test(" BulkList component", async () => {
    const mockData = [
      {
        fileName: "filgrg4g4g.csv",
        totalEntries: 4,
        totalErrors: 4,
        timeTaken: 0.029,
        session_id: "1024c9a4-ea02-40af-a1cc-7fca94d6c3f2",
        createdAt: "2024-01-16T09:06:59.454+00:00",
        updatedAt: "2024-01-16T09:06:59.454+00:00",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: { data: mockData } });
    render(
      <Router>
        <BulkUploadList />
      </Router>
    );

    // await waitFor(() => {
    //   expect(axios.get).toHaveBeenCalledWith(
    //     "http://localhost:4000/up/bulk-uploads-list",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    // });
    // expect(screen.getByText("4")).toBeInTheDocument();

  });
});
