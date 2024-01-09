import { Layout, Spin } from "antd";
// import MobileList from "./MobileList"
import { Suspense, lazy } from "react";
const LazyMobileList = lazy(() => import("./MobileList"));

const MobileListing = () => {
  return (
    <Layout>
      <div style={{ padding: "0 10px", minHeight: 100 }}>
        <Suspense fallback={<Spin tip="Loading..." />}>
          <LazyMobileList />
        </Suspense>
      </div>
    </Layout>
  );
};
export default MobileListing;
