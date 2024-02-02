import { lazy } from "react";
const Dashboard = lazy(() => import("./Dashboard"));
const Slideshow = lazy(() => import("./Slideshow"));
const DashboardWrapper = lazy(() => import ("./DashContext"));
export { Dashboard, DashboardWrapper, Slideshow };
