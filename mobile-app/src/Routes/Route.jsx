import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ErrorPage } from "../components";
import { Edit, MobileDetails, PostingData } from "../modules/mobiles";
import ProtectedRoute from "./authRoutes/protectedRoutes";
import PublicRoute from "./authRoutes/publicRoutes";
import { Dashboard, Login, Register } from "../modules";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="dashboard" element={<PublicRoute><Dashboard /></PublicRoute>} />
        <Route path="dashboard/:id" element={<MobileDetails />} />
        <Route path="uploads" element={<PostingData />} />
        <Route path="edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
        <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
