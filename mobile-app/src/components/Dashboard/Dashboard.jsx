import React from "react";
import { Nav } from "../Nav";
import { Link, Route, Routes } from "react-router-dom";
import MobileDetails from "../../modules/mobiles/ShowDetails/ShowDetail";
import Slideshow from "./Slideshow";
import { Footer } from "antd/es/layout/layout";
import Uploads from "../../modules/mobiles/Uploads";
import MobileListing from "../../modules/mobiles/MobileListing";
import "./Dash.css";
import { ErrorPage } from "../Error";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <div className="header-container">
      <h1 style={{
    textAlign: 'center',
    color: '#4285f4',
    fontSize: '2.5em',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    background: '#f0f8ff',
    padding: '10px', 
    borderRadius: '8px', 
  }}>
   MOBILE VIESTA
</h1>
        <div className="image-background">
          <div className="video-background">
            <Slideshow />
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<></>} />
        <Route path="mobiles" element={<MobileListing />} />
        <Route path="mobiles/:modelNumber" element={<MobileDetails />} />
        <Route path="uploads" element={<Uploads />} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <Footer
  style={{
    textAlign: "center",
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#f0f8ff", 
    padding: "10px", 
  }}
>
  Mobile Vista ©2023 Created by Pranjhi Singh
</Footer>
    </>
  );
};

export default Dashboard;
