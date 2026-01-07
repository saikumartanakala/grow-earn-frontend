import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  role: "USER" | "CREATOR";
}

export default function RoleGuard({ children, role }: RoleGuardProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // USER / CREATOR

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
