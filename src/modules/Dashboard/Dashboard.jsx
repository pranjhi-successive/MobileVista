import React, { useContext, useState } from "react";
import "./Dash.css";
import { Link } from "react-router-dom";
import Listing from "../mobiles/MobileListing/Listing";
import { DashboardContext } from "./DashContext";
import PostingData from "../mobiles/Uploads/Data";
import { Content, Footer, Layout, Menu } from "../../components";
import {
  HomeOutlined,
  LoginOutlined,
  MobileOutlined,
  UploadOutlined,
} from "../../components/Icons/Icons";
import { AuthenticationContext } from "../User/Authentication/Context";
import Slideshow from "./Slideshow";
import { Switch } from "../../components/Switch";

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
      label: <strong>Home</strong>,
      icon: <HomeOutlined />,
    },
    {
      key: "Mobiles",
      label: <strong>Mobiles</strong>,
      icon: <MobileOutlined />,
    },
    {
      key: "Uploads",
      label: <strong>Uploads</strong>,
      icon: <UploadOutlined />,
    },
    {
      key: "Login",
      label: isAuthenticated ? (
        <Link onClick={handleLogout}><strong>Logout</strong></Link>
      ) : (
        <Link to={"/login"}><strong>Login</strong></Link>
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
