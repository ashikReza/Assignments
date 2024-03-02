import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/common/Header";

import ProfileProvider from "../providers/ProfileProvider";
import BlogsProvider from "../providers/BlogsProvider";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  // Check if auth exists and auth.user exists before rendering the Outlet
  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }

  return (
    <ProfileProvider>
      <BlogsProvider>
        <Header />
        <Outlet />
      </BlogsProvider>
    </ProfileProvider>
  );
}
