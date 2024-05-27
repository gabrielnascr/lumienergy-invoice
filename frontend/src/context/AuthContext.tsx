import React, { useContext, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../store";
import {
  authenticate,
  loadUser,
  logout,
} from "../store/modules/auth/authSlice";

interface AuthContextProps {
  authenticated: boolean;
  loading: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  signIn: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading, user, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    store.dispatch(loadUser());
  }, [store.dispatch]);

  const value = {
    authenticated,
    loading,
    user,
    signIn: (email: string, password: string) =>
      store.dispatch(authenticate({ email, password })),
    logout: () => store.dispatch(logout()),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
