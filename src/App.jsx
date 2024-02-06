import React, { Suspense } from "react";
import RouterComponent from "./Routes/Route";
import { AuthWrapper } from "./modules/User/Authentication";
import { Spin } from "./components";
import { DashboardWrapper } from "./modules/Dashboard";

const App = () => {
  return (
    <Suspense  fallback={
      <Spin tip="Loading" size="large">
        please wait ....
      </Spin>
    }>

    <DashboardWrapper>
      <AuthWrapper>
        <RouterComponent />
      </AuthWrapper>
    </DashboardWrapper>
    </Suspense>
  );
};

export default App;
