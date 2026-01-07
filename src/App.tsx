import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import CreatorDashboard from "./pages/Creator/CreatorDashboard";
import CreateCampaign from "./pages/Creator/CreateCampaign";
import ViewerDashboard from "./pages/Viewer/ViewerDashboard";
import ViewerTasks from "./pages/Viewer/ViewerTasks";

import RoleGuard from "./routes/RoleGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Creator */}
        <Route
          path="/creator/dashboard"
          element={
            <RoleGuard role="CREATOR">
              <CreatorDashboard />
            </RoleGuard>
          }
        />

        <Route
          path="/creator/create-campaign"
          element={
            <RoleGuard role="CREATOR">
              <CreateCampaign />
            </RoleGuard>
          }
        />

        {/* Viewer */}
        <Route
          path="/viewer/dashboard"
          element={
            <RoleGuard role="USER">
              <ViewerDashboard />
            </RoleGuard>
          }
        />

        <Route
          path="/viewer/tasks"
          element={
            <RoleGuard role="USER">
              <ViewerTasks />
            </RoleGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
