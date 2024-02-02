import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../modules/mobiles/User/Authentication/Context";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { setIsAuthenticated, setAuthData } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/token", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setIsAuthenticated(true);
        setAuthData({
          userId: response.data.data._id,
          email: response.data.data.email,
        });
      } catch (error) {
        console.log(error);

        localStorage.clear();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  if (isLoading) {
    return null;
  }

  if (localStorage.getItem("token")) {
    return children;
  }

  return <Navigate to="/login" replace />;
};
export default ProtectedRoute;
