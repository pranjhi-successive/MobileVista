import React, { useContext, useState } from "react";

import Slideshow from "./Slideshow";
import "./Dash.css";
import { Link } from "react-router-dom";
import Listing from "../mobiles/MobileListing/Listing";
import { DashboardContext } from "./DashContext";
import PostingData from "../mobiles/Uploads/Data";
import { AuthenticationContext } from "../mobiles/User/Authentication/Context";
import { Content, Footer, Layout, Menu } from "../../components";
import Switch from "../../components/Switch/Switch";
import {
  HomeOutlined,
  LoginOutlined,
  MobileOutlined,
  UploadOutlined,
} from "../../components/Icons/Icons";

const componentMap = {
  Home: <Slideshow />,
  Mobiles: <Listing />,
  Uploads: <PostingData />,
};

const Dashboard = () => {
  const [theme, setTheme] = useState("dark");
  const { isAuthenticated } = useContext(AuthenticationContext);

  const { dashboardSelectedItem, setDashboardSelectedItem } =
    useContext(DashboardContext);
  const handleUser = () => {
    if (isAuthenticated) {
      label: <Link to={"/login"}>Login</Link>;
    }
  };
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navBarItems = [
    {
      key: "Home",
      label: "Home ",
      icon: <HomeOutlined />,
    },
    {
      key: "Mobiles",
      label: "Mobiles",
      icon: <MobileOutlined />,
    },
    {
      key: "Uploads",
      label: "Upload",
      icon: <UploadOutlined />,
    },
    {
      key: "Login",
      label: isAuthenticated ? (
        <Link onClick={handleLogout}>Logout</Link>
      ) : (
        <Link to={"/login"}>Login</Link>
      ),
      icon: <LoginOutlined />,
    },
  ];

  return (
    <Layout>
      <div>
        <Menu
          theme={theme}
          mode="horizontal"
          style={{ lineHeight: "64px", borderBottom: "1px solid #e8e8e8" }}
          items={navBarItems}
          selectedKeys={[dashboardSelectedItem]}
          onClick={(e) => setDashboardSelectedItem(e.key)}
        />
      </div>
      <Switch
        label="switch"
        checked={theme === "dark"}
        style={{ marginTop: "10px", width: "70px", height: "25px" }}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        data-testid="theme-switch"
      />
      <Content>{componentMap[dashboardSelectedItem]}</Content>

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
    </Layout>
  );
};

export default Dashboard;
