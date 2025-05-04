import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let isAuthenticated = useSelector((state) => state.auth.status);

  if (!isAuthenticated) {
    // replace is important here
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
