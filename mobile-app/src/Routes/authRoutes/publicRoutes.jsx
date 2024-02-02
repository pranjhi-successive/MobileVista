import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../modules/mobiles/User/Authentication/Context";
import axios from "axios";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { setIsAuthenticated} = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        await axios.get("http://localhost:4000/user/token", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        localStorage.clear();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  
    return children;
 
};
export default PublicRoute;
