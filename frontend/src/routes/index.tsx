import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../pages/Auth/Layout";
import DashboardLayout from "../pages/Dashboard/Layout";
import { RequireAuth } from "./PrivateRoutes";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import DashboardRoutes from "./Dashboard";

export default function App() {
  const { loading } = useAuth();

  return (
    <BrowserRouter>
      {loading && <Loading />}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
