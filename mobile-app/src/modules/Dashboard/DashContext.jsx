import { createContext, useMemo, useState } from "react";

export const DashboardContext = createContext();

const DashboardWrapper = ({ children }) => {
  const [dashboardSelectedItem, setDashboardSelectedItem] = useState("Mobiles");
  const contextValue = useMemo(() => {
    return { dashboardSelectedItem, setDashboardSelectedItem };
  }, [dashboardSelectedItem, setDashboardSelectedItem]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardWrapper;
