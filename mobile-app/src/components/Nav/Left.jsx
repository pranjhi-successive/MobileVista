import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const NavBar1 = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="mobiles">
        <Link to="mobiles">Mobiles</Link>
      </Menu.Item>
      <Menu.Item key="uploads">
        <Link to="uploads">Uploads</Link>
      </Menu.Item>
    </Menu>
  );
};
export default NavBar1;
