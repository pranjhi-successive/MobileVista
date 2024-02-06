import { lazy } from "react";
const Dashboard = lazy(() => import("./Dashboard"));
const DashboardWrapper = lazy(() => import ("./DashContext"));
export { Dashboard, DashboardWrapper};
