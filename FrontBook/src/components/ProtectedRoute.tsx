import { Navigate, Outlet } from "react-router-dom";
import useAuthToken from "../store/storeAuthZustand";

function ProtectedRoute() {
  const { isAuthenticate } = useAuthToken();

  if (!isAuthenticate()) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
