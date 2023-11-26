import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("user");
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
