import { createContext, useMemo, useState } from "react";
export const AuthenticationContext = createContext();
const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState("");
  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, authData, setAuthData }),
    [isAuthenticated, authData]
  );
  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};
export default AuthWrapper;
