import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space, Rate, Image } from "antd";
import axios from "axios";
import "../css/ShowDetails.css";
import { ErrorPage } from "../../../components/Error";
const MobileDetails = () => {
  // const { modelNumber } = useParams();
  console.log("helloooooooo");
  const { id } = useParams();
  console.log("id", id);
  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

  const [mobile, setMobile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/${id}`);
        console.log("data fetched");
        console.log(response.data);
        // console.log(response)

        setMobile(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  if (!mobile) {
    return <ErrorPage />;
  }
  return (
    <div className="mobile-details-container">
      <h2 className="hel">
        {mobile.brand}</h2>
        <p className="model">ModelNumber : {mobile.modelNumber}</p>
      
      <Image
        width={750}
        height={400}
        src={mobile.image}
        alt={`${mobile.brand} ${mobile.modelNumber}`}
      />

      <div className="table-container">
        <h3>Specifications:</h3>
        <table>
          <tbody>
            <tr>
              <th>Price</th>
              <td>{mobile.price}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{mobile.color}</td>
            </tr>
            <tr>
              <th>Display</th>
              <td>{mobile?.specifications?.display}</td>
            </tr>
            <tr>
              <th>Camera</th>
              <td>{mobile?.specifications?.camera}</td>
            </tr>
            <tr>
              <th>Processor</th>
              <td>{mobile?.specifications?.processor}</td>
            </tr>
            <tr>
              <th>Storage</th>
              <td>{mobile?.specifications?.storage}</td>
            </tr>
            <tr>
              <th>Realease Date</th>
              <td>{new Date(mobile.releaseDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th>Battery Capacity</th>
              <td> {mobile.batteryCapacity}</td>
            </tr>
            <tr>
              <th>Operating System</th>
              <td> {mobile.operatingSystem}</td>
            </tr>
            <tr>
              <th>Water Resistant</th>
              <td> {mobile.isWaterResistant ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="connectivity-section">
          <div className="box">
            <h3>Connectivity:</h3>
            <Space direction="vertical">
              <p>
                <b>Wi-Fi : </b>
                {mobile?.connectivity?.wifi ? "Yes" : "No"}
              </p>
              <p>
                <b>Bluetooth : </b>
                {mobile?.connectivity?.bluetooth ? "Yes" : "No"}
              </p>
              <p>
                <b>Cellular :</b>
                {mobile?.connectivity?.cellular ? "Yes" : "No"}
              </p>
            </Space>
          </div>
        </div>
      </div>
      <div className="weight-section">
        {mobile.weight && (
          <div className="box">
            <h3>Weight:</h3>
            <p>{mobile.weight} grams</p>
          </div>
        )}
      </div>
      <div className="additional-features-section">
        {mobile.additionalFeatures && (
          <div className="box">
            <h3>Additional Features:</h3>
            <ul>
              {mobile.additionalFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="accessories-section">
        {mobile.accessories && (
          <div className="box">
            <h3>Accessories:</h3>
            <ul>
              {mobile.accessories.map((accessory) => (
                <li key={accessory.id}>
                  {accessory.name} - {accessory.type}, Price: {accessory.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="warranty-section">
        {mobile.warranty && (
          <div>
            <h3>Warranty:</h3>
            {mobile.warranty.validUntil && (
              <p>
                Valid until:{" "}
                {new Date(mobile.warranty.validUntil).toLocaleDateString()}
              </p>
            )}
            {mobile.warranty.type && <p>Type: {mobile.warranty.type}</p>}
          </div>
        )}
      </div>
      <div className="rating-section">
        <h3>Rating:</h3>
        <Space direction="vertical">
          <Rate
            disabled
            tooltips={["Terrible", "Bad", "Normal", "Good", "Wonderful"]}
            value={mobile.rating}
          />
          {mobile.rating ? <span>{desc[mobile.rating - 1]}</span> : ""}
        </Space>
      </div>
    </div>
  );
};

export default MobileDetails;
