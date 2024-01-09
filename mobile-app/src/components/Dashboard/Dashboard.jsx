import React, { useContext, useState } from "react";
import { Layout, Menu, Switch } from "antd";

import Slideshow from "./Slideshow";
import Uploads from "../../modules/mobiles/Uploads";
import MobileListing from "../../modules/mobiles/MobileListing";
import "./Dash.css";
import { DashboardContext } from "../../Route";
import { Profile } from "../Profile";
import { Link } from "react-router-dom";

const { Content, Footer } = Layout;

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const componentMap = {
  Home: <Slideshow />,
  Mobiles: <MobileListing />,
  Uploads: <Uploads />,
  Profile: <Profile />,
};

const navBarItems = [
  getItem("Home", "Home", null, null, "item"),
  getItem("Mobiles", "Mobiles", null, null, "item"),
  getItem("Uploads", "Uploads", null, null, "item"),
  getItem(<Link to={"/login"}>Login</Link>, "Login", null, null, "item"),
  getItem("Profile", "Profile", null, null, "item"),
];

const Dashboard = () => {
  const [theme, setTheme] = useState("dark");
  const { dashboardSelectedItem, setDashboardSelectedItem } =
    useContext(DashboardContext);

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <>
      <Layout>
        <Menu
          theme={theme}
          mode="horizontal"
          style={{ lineHeight: "64px", borderBottom: "1px solid #e8e8e8" }}
          items={navBarItems}
          selectedKeys={[dashboardSelectedItem]}
          onClick={(e) => setDashboardSelectedItem(e.key)}
        />
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
      </Layout>

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
