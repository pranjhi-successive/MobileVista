import React, { useState, useEffect, createContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import axios from "axios";
import { Profile } from "./components/Profile";
import { ErrorPage } from "./components/Error";
import { Dashboard } from "./components";
import { Login, Register } from "./components/User";
import MobileListing from "./modules/mobiles/MobileListing";
import MobileDetails from "./modules/mobiles/ShowDetails/ShowDetail";
import Uploads from "./modules/mobiles/Uploads";
import Edit from "./components/Edit/Edit";

export const DashboardContext = createContext();

const RouterComponent = () => {
  // const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardSelectedItem, setDashboardSelectedItem] = useState("Mobiles");

  
  return (
    <div>
      <Router>
        <DashboardContext.Provider
          value={{ dashboardSelectedItem, setDashboardSelectedItem }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/mobiles" element={<MobileListing />} />
            <Route path="dashboard/:id" element={<MobileDetails />} />
            <Route path="uploads" element={<Uploads />} />
            <Route path="edit/:id" element={<Edit />} />
            {/* <Route path="*" element={<ErrorPage/>}/> */}
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </DashboardContext.Provider>
      </Router>
    </div>
  );
};

export default RouterComponent;
