import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import sidebarItems from "./Sidebar";
import MobileCreate from "./Create";
import Bulk from "./bulk";

const PostingData = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("upload-single")
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const componentMap = {
    "upload-single": <MobileCreate />,
    "bulk-upload": <Bulk />,
  };

  return (
    <div>
      <Content style={{ padding: "0 0" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              style={{ height: "100%" }}
              items={sidebarItems}
              selectedKeys={selectedMenuItem}
              onClick={(e) => setSelectedMenuItem(e.key)}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {componentMap[selectedMenuItem]}
          </Content>

        </Layout>

      </Content>
    </div>
  );
};

export default PostingData;