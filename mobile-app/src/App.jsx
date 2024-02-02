import React from "react";
import { DashboardWrapper } from "./modules/Dashboard";
import { AuthWrapper } from "./modules";
import RouterComponent from "./Routes/Route";

const App = () => {
  return (
    <DashboardWrapper>
      <AuthWrapper>
        <RouterComponent />
      </AuthWrapper>
    </DashboardWrapper>
  );
};

export default App;
