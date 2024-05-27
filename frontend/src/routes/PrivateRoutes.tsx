import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { authenticated, loading } = useAuth();
  const location = useLocation();
  if (!authenticated && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
