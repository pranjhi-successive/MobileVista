import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../modules/User/Authentication/Context";

import apiInstance from "../../service/services";

const PublicRoute = ({ children }) => {
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        await apiInstance.get("/user/token", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        localStorage.clear();
        setIsAuthenticated(false);
      } 
    };

    getUser();
  }, []);

  return  children;
};
export default PublicRoute;
