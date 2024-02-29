import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/common/Header";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  // Check if auth exists and auth.user exists before rendering the Outlet
  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
