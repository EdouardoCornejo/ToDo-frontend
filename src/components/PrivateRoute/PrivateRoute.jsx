import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * If the user is not logged in, redirect to the login page. Otherwise, render the children.
 * @returns The children of the component.
 */
const PrivateRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.session.token);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: accessToken }} replace />;
  }

  return children;
};

export default PrivateRoute;
