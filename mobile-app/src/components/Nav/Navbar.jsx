import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout } from "antd";
import React, { useState } from "react";

import "../Nav/nav.css";
import NavBar1 from "./Left";
import RightMenu from "./Right";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
            <div className="logo">
                <h3 className="brand-font">Mobile  Viesta</h3>
            </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <NavBar1 mode={"horizontal"} />
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <div className="rightMenu">
              <RightMenu mode={"horizontal"} />
            </div>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <NavBar1 mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;