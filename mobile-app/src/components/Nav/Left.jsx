// // NavBar.js
// import React, { useState } from 'react';
// import { DesktopOutlined, FileOutlined, PieChartOutlined } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { Link } from 'react-router-dom'; // Import Link
// import Slideshow from '../../modules/mobiles/slideshow';

// const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, to = '/', children) {
//   return {
//     key,
//     icon,
//     to,
//     children,
//     label,
//   };
// }

// const items = [
//   getItem('Home', '1', <PieChartOutlined />,'/nav'),
//   getItem('Mobile', '2', <DesktopOutlined />, '/dashboard/mobiles'), // Update the link for MobileList
//   // getItem('User', 'sub1', <UserOutlined />, [
//   //   getItem('Tom', '3'),
//   //   getItem('Bill', '4'),
//   //   getItem('Alex', '5'),
//   // ]),
//   // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

// const NavBar1 = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout
//       style={{
//         minHeight: '100vh',
//       }}
//     >
//       <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//         <div className="demo-logo-vertical" />
//         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//           {items.map((item) => (
//             <Menu.Item key={item.key} icon={item.icon}>
//               <Link to={item.to}>{item.label}</Link>
//             </Menu.Item>
//           ))}
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />
//         <Content
//           style={{
//             margin: '0 16px',
//           }}
//         >
//           <Breadcrumb
//             style={{
//               margin: '16px 0',
//             }}
//           ></Breadcrumb>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <h1>WELCOME to MOBILE VIESTA</h1>
//             <Slideshow />
//           </div>
//         </Content>
//         <Footer
//           style={{
//             textAlign: 'center',
//           }}
//         >
//           Mobile Vista ©2023 Created by Pranjhi Singh
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default NavBar1;
import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const NavBar1=({mode})=>{
  return(
<Menu mode={mode}>
  <Menu.Item key="mobiles">
    <Link to ="mobiles">Mobiles</Link>
  </Menu.Item>
  <Menu.Item key="uploads">
    <Link to ="uploads">Uploads</Link>
  </Menu.Item>
</Menu>
  )
}
export default NavBar1;