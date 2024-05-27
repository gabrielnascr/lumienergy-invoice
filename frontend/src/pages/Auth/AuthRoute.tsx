import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface AuthRouteProps {
  redirectPath: string;
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ redirectPath, children }) => {
  const { authenticated, loading } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (authenticated && !loading) {
      navigation(redirectPath);
    }
  }, [authenticated, loading, navigation, redirectPath]);

  return <>{children}</>;
};

export default AuthRoute;
