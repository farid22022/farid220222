import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Loader label="Checking admin session" />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
