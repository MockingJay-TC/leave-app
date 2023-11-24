import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
