import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { PostingData } from "../modules/mobiles/Uploads";
import MobileForm from "../modules/mobiles/Uploads/Create";
import TestMobile from "./TestMobile";
import { act } from "react-dom/test-utils";
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

describe("Login Page Test", () => {
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

  test("login ", async () => {
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <PostingData />
          </Router>
        </AuthWrapper>
      );
    }); 

    expect(screen.getByText("bulk-upload")).toBeInTheDocument();
    expect(screen.getByText("upload-single")).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "create" })).toBeInTheDocument();
  });
  test("displays MobileForm component", async () => {
    act(() => {
      render(
        <AuthWrapper>
          <Router>
            <PostingData />
          </Router>
        </AuthWrapper>
      );
    }); 

    const menuItem = screen.getByText("upload-single");
    fireEvent.click(menuItem);

    expect(screen.getByText("Create Mobile")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
  });
  test("displays MobileForm component", async () => {
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <PostingData />
          </Router>
        </AuthWrapper>
      );
    }); 

    const menuItem = screen.getByText("upload-single");
    fireEvent.click(menuItem);

    expect(screen.getByText("Create Mobile")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
  });
  test("displays correct form heading for upload-single option", async () => {
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <PostingData />
          </Router>
        </AuthWrapper>
      );
    }); 

    const menuItem = screen.getByText("upload-single");
    fireEvent.click(menuItem);

    expect(screen.getByText("Create Mobile")).toBeInTheDocument();
  });
  test("displays Bulk component", async () => {
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <PostingData />
          </Router>
        </AuthWrapper>
      );
    });

    const menuItem = screen.getByText("bulk-upload");
    expect(menuItem).toBeInTheDocument();

    // fireEvent.click(menuItem);

    // expect(
    //   screen.getByText("Click or drag file to this area to upload")
    // ).toBeInTheDocument();
  });
  test("displays Bulk component", async () => {
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <PostingData />
          </Router>
        </AuthWrapper>
      );
    });
    const menuItem = screen.getByText("bulk-upload");
    expect(menuItem).toBeInTheDocument();
    // expect(screen.getByText("Loading")).toBeInTheDocument();
    
    // fireEvent.click(menuItem);


    // expect(
    //   screen.getByText("Click or drag file to this area to upload")
    // ).toBeInTheDocument();
  });
  // test("changes selected menu item", async () => {
  //   act(() => {
  //     render(
  //       <AuthWrapper>
  //         <PostingData />
  //       </AuthWrapper>
  //     );
  //   });
  //   await waitFor(() => {
  //     const menuItem = screen.getByText("bulk-upload");
  //     fireEvent.click(menuItem);
  //   });

  //   expect(
  //     screen.getByText("Click or drag file to this area to upload")
  //   ).toBeInTheDocument();

  //   const uploadSingleMenuItem = screen.getByText("upload-single");
  //   fireEvent.click(uploadSingleMenuItem);

  //   expect(screen.getByText("Create Mobile")).toBeInTheDocument();
  //   expect(screen.getByText("submit")).toBeInTheDocument();
  // });
  test("sends a POST request upon form submission", async () => {
    await act(() => {
      render(
        <AuthWrapper>
          <Router>
            <PostingData />
          </Router>
        </AuthWrapper>
      );
    });
    // const menuItem1 = screen.getByText("bulk-upload");
    // fireEvent.click(menuItem1);
    const menuItem = screen.getByText("upload-single");
    fireEvent.click(menuItem);

    const submitButton = screen.getByText("submit");
    fireEvent.click(submitButton);
  });
  // // Renders a form with input fields for brand, model number, price, color, specifications, release date, battery capacity, connectivity, weight, operating system, is water resistant, additional features, accessories, warranty, and image URL.
  it("should render a form with input fields for all the specified properties", async () => {
    await act(async () => {
      render(<MobileForm />);
    });

    const brandInput = screen.getByLabelText("Brand");
    const modelNumberInput = screen.getByLabelText("Model Number");
    const priceInput = screen.getByLabelText("Price");
    const colorInput = screen.getByLabelText("Color");
    const displayInput = screen.getByLabelText("Display");
    const cameraInput = screen.getByLabelText("Camera");
    const processorInput = screen.getByLabelText("Processor");
    const storageInput = screen.getByLabelText("Storage");
    const releaseDateInput = screen.getByLabelText("Release Date");
    const batteryCapacityInput = screen.getByLabelText("Battery Capacity");
    const wifiCheckbox = screen.getByLabelText("Wi-Fi");
    const bluetoothCheckbox = screen.getByLabelText("Bluetooth");
    const cellularCheckbox = screen.getByLabelText("Cellular");
    const weightInput = screen.getByLabelText("Weight");
    const operatingSystemInput = screen.getByLabelText("Operating System");
    const isWaterResistantCheckbox =
      screen.getByLabelText("Is Water Resistant");
    const additionalFeaturesInput = screen.getByPlaceholderText(
      "Enter additional features"
    );
    const accessoryNameInput = screen.getByPlaceholderText("Accessory Name");
    const validUntilInput = screen.getByLabelText("Valid Until");
    const warrantyTypeInput = screen.getByLabelText("Type");
    const imageURLInput = screen.getByLabelText("Image URL");

    // Assert
    expect(brandInput).toBeInTheDocument();
    expect(modelNumberInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(colorInput).toBeInTheDocument();
    expect(displayInput).toBeInTheDocument();
    expect(cameraInput).toBeInTheDocument();
    expect(processorInput).toBeInTheDocument();
    expect(storageInput).toBeInTheDocument();
    expect(releaseDateInput).toBeInTheDocument();
    expect(batteryCapacityInput).toBeInTheDocument();
    expect(wifiCheckbox).toBeInTheDocument();
    expect(bluetoothCheckbox).toBeInTheDocument();
    expect(cellularCheckbox).toBeInTheDocument();
    expect(weightInput).toBeInTheDocument();
    expect(operatingSystemInput).toBeInTheDocument();
    expect(isWaterResistantCheckbox).toBeInTheDocument();
    expect(additionalFeaturesInput).toBeInTheDocument();
    expect(accessoryNameInput).toBeInTheDocument();
    expect(validUntilInput).toBeInTheDocument();
    expect(warrantyTypeInput).toBeInTheDocument();
    expect(imageURLInput).toBeInTheDocument();
  });
});
