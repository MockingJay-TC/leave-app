import { Navigate, Outlet } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user") as string)?.user;

export const ProtectedRoute = () => {
  if (user && user.role === "employee") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export const AdminRoute = () => {
  if (user && user.role === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};
