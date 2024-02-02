import React, { useState } from "react";
import sidebarItems from "./Sidebar";
import Bulk from "./bulk";
import MobileForm from "./Create";
import { Content, Layout, Menu, Sider, Theme } from "../../../components";

const PostingData = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("upload-single");
  const {
    token: { colorBgContainer },
  } = Theme.useToken();
  const componentMap = {
    "upload-single": (
      <MobileForm
        submitMessage="submit"
        formHeading="Create Mobile"
        method="POST"
        url="http://localhost:4000/api/create"
        message1="Mobile Created Successfully"
      />
    ),
    "bulk-upload": <Bulk />,
  };

  return (
    <div>
      <Layout>
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
      </Layout>
    </div>
  );
};

export default PostingData;
