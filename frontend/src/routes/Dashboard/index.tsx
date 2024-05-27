import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "../PrivateRoutes";
import Sidebar from "../../components/Sidebar";

import Dashboard from "../../pages/Dashboard/Index";
import Invoice from "../../pages/Dashboard/Invoice";

export default function DashboardRoutes() {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 p-20">
        <RequireAuth>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="invoices" element={<Invoice />} />
            <Route path="settings" element={<>adas</>} />
          </Routes>
        </RequireAuth>
      </div>
    </div>
  );
}
