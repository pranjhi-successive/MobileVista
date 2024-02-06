import React, { lazy, useContext, useState } from "react";
import sidebarItems from "./Sidebar";
import { Content, Layout, Menu, Sider } from "../../../components";
import { AuthenticationContext } from "../../User/Authentication/Context";
const  Bulk = lazy(()=>import ("./bulk"));
const  MobileForm = lazy(()=>import ("./Create")) ;

const PostingData = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("upload-single");
  const {authData } = useContext(AuthenticationContext);


  const componentMap = {
    "upload-single": (
      <MobileForm
        submitMessage="submit"
        formHeading="Create Mobile"
        method="POST"
        url="http://localhost:4000/api/create"
        message1="Mobile Created Successfully"
        createdBy={authData?.userId}
      />
    ),
    "bulk-upload": <Bulk />,
  };

  return (
    <div>
      <Layout>
        <Content style={{ padding: "0 0" }}>
          <Layout style={{ padding: "24px 0", background: "white" }}>
            <Sider style={{ background: "white" }} width={200}>
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
