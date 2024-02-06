import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bulk from "../modules/mobiles/Uploads/bulk";
import BulkUploadList from "../modules/mobiles/Uploads/history";
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
describe("Login Page Test", () => {
  test("login ", async () => {
    await act(async()=>{
    render(<Bulk />);
    })

    expect(
      screen.getByText("Click or drag file to this area to upload")
    ).toBeInTheDocument();
  });
  test("table ", async () => {
    render(<BulkUploadList />);

   waitFor(()=>{
    expect(
      screen.queryByTestId("table")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("drawer")
    ).toBeInTheDocument();
  });

   }) 
  test('should display success message on file upload', async () => {
    render(<Bulk />);
    const file = new File(['test'], 'test.csv', { type: 'text/csv' });
    const formData = new FormData();
    formData.append('file', file);
    const mockResponse = { ok: true };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
      })
    );
    await act(async () => {
      fireEvent.change(screen.getByTestId('file-input'), {
        target: { files: [file] },
      });
    });
    expect(screen.getByText(`${file.name} uploaded successfully`)).toBeInTheDocument();
    global.fetch.mockRestore();
  });
  test('should display error message on file upload failure', async () => {
    render(<Bulk />);
    const file = new File(['test'], 'test.csv', { type: 'text/csv' });
    const formData = new FormData();
    formData.append('file', file);
    const mockResponse = { ok: false };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: false,
      })
    );
    await act(async () => {
      fireEvent.change(screen.getByTestId('file-input'), {
        target: { files: [file] },
      });
    });
    expect(screen.getByText(`${file.name} upload failed.`)).toBeInTheDocument();
    global.fetch.mockRestore();
  });
});
