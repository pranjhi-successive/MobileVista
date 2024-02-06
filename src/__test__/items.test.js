import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import  { LazyCardImage } from "../modules/mobiles/MobileListing/Items";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Listing } from "../modules/mobiles";
import TestMobile from "./TestMobile";
import { AuthWrapper } from "../modules/User/Authentication";

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
  let testMobile;

  beforeAll(async () => {
    testMobile = new TestMobile();
  });

  beforeEach(async () => {
    await testMobile.insertFakeEntry();
  });

  afterEach(async () => {
    await testMobile.deleteFakeEntry();
  });
  test("should render a lazy-loaded Image  prop", () => {
    render(<LazyCardImage src="image.jpg" />);
    const lazyImage = screen.getByTestId("lazy-image");
    expect(lazyImage).toBeInTheDocument();
  });
  test("should render a list of mobiles with their details", async () => {
    render(
      <Router>
        <Listing />
      </Router>
    );

    expect(await screen.findByText("Mobile List")).toBeInTheDocument();
  });
  test("should update currentPage, setCurrentPage, setItemsPerPage, and setToFetch when called with valid page and size parameters", () => {
    const setCurrentPage = jest.fn();
    const setItemsPerPage = jest.fn();
    const setToFetch = jest.fn();
    const handlePageChange = (page, size) => {
      setCurrentPage(page);
      setItemsPerPage(size);
      setToFetch(true);
    };
    render(
      <Router>
        <Listing />
      </Router>
    );

    const page = 2;
    const size = 10;

    act(() => {
      handlePageChange(page, size);
    });

    expect(setCurrentPage).toHaveBeenCalledWith(page);
    expect(setItemsPerPage).toHaveBeenCalledWith(size);
    expect(setToFetch).toHaveBeenCalledWith(true);
  });
  test("should handle errors when editing a mobile", async () => {
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <Listing />
          </Router>
        </AuthWrapper>
      );
    });

    expect(await screen.getByText("Loading ....")).toBeInTheDocument();
    expect(await screen.getByText("Filters")).toBeInTheDocument();
    expect(await screen.getByText("By Price")).toBeInTheDocument();
    expect(await screen.getByText("By Brand")).toBeInTheDocument();
    expect(await screen.getByText("Apply Filters")).toBeInTheDocument();
    expect(await screen.getByText("Clear Filters")).toBeInTheDocument();
    window.location.reload();

    expect(await screen.findByText("Mobile List")).toBeInTheDocument();

    screen.debug();

    const editElements = screen.getByTestId("edit-icon-0");
    expect(editElements).toBeInTheDocument();
    expect(await screen.getByText("By Color")).toBeInTheDocument();
    expect(await screen.getByText("By Price")).toBeInTheDocument();
    expect(await screen.getByText("Filters")).toBeInTheDocument();

    fireEvent.click(editElements);
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMwYWRkNzk4YjM4ZGFlODVmOGFhYjIiLCJpYXQiOjE3MDcyMTI0MjIsImV4cCI6MTcwNzIxNjAyMn0.tk-j_-0uEgC_CDrwCSFQL4xEdkXQeIKu5C_7_aBkV88"
    );
    await waitFor(() => {
      expect(window.location.pathname).toBe("/edit/65c0c4545ff420e2cb580aff");
    });
    const view = screen.getByTestId("view-icon-0");
    expect(view).toBeInTheDocument();
    fireEvent.click(view);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/65c0c4545ff420e2cb580aff");
    });
    const deleteElement = screen.getByTestId("delete-icon-0");
    expect(deleteElement).toBeInTheDocument();
    fireEvent.click(deleteElement);

    expect(await screen.getByText("Delete the task")).toBeInTheDocument();
    expect(
      await screen.getByText("Are you sure to delete this task?")
    ).toBeInTheDocument();
    expect(await screen.getByText("Yes")).toBeInTheDocument();
    expect(await screen.getByText("No")).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: "No" });
    fireEvent.click(deleteButton);
    expect(await screen.findByText("Clicked on No")).toBeInTheDocument();
    fireEvent.click(deleteElement);
    const confirmButton = screen.getByRole("button", { name: "Yes" });
    fireEvent.click(confirmButton);
    expect(await screen.findByText("Deleted")).toBeInTheDocument();
  });
  test("should update filters state when a price filter is applied", async () => {
    render(
      <Router>
        <Listing />
      </Router>
    );
    const searchInput = screen.getByPlaceholderText("Search mobiles...");
    expect(searchInput).toHaveValue("");
    const searchButton = screen.getByRole("button", { name: "search" });
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(await screen.findByText("Select colors")).toBeInTheDocument();
    expect(await screen.findByText("Select brand")).toBeInTheDocument();
    const apply = await screen.findByText("Apply Filters");
    expect(apply).toBeInTheDocument();
    fireEvent.click(apply);
    const clear = await screen.findByText("Clear Filters");
    expect(clear).toBeInTheDocument();
    fireEvent.click(clear);
    const slider = screen.getAllByRole("slider");
    expect(slider.length).toBeGreaterThanOrEqual(0);
  });
  test("should update currentPage, setCurrentPage, setItemsPerPage, and setToFetch when called with valid page and size parameters", () => {
    const setCurrentPage = jest.fn();
    const setItemsPerPage = jest.fn();
    const setToFetch = jest.fn();
    const handlePageChange = (page, size) => {
      setCurrentPage(page);
      setItemsPerPage(size);
      setToFetch(true);
    };
    render(
      <Router>
        <Listing />
      </Router>
    );

    const page = 2;
    const size = 10;

    act(() => {
      handlePageChange(page, size);
    });

    expect(setCurrentPage).toHaveBeenCalledWith(page);
    expect(setItemsPerPage).toHaveBeenCalledWith(size);
    expect(setToFetch).toHaveBeenCalledWith(true);
  });
});
