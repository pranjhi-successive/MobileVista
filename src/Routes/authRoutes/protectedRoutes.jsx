import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../modules/User/Authentication/Context";
import apiInstance from "../../service/services";

const ProtectedRoute = ({ children }) => {
  const { setIsAuthenticated, setAuthData } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiInstance.get("/user/token", {
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
