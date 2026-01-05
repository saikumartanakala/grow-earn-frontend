

// import { Navigate } from "react-router-dom";
// import type { ReactNode } from "react";

// interface RoleGuardProps {
//   allowedRole: "USER" | "CREATOR";
//   children: ReactNode;
// }

// export default function RoleGuard(props: RoleGuardProps) {
//   const { allowedRole, children } = props;

//   const role = localStorage.getItem("role");

//   if (role !== allowedRole) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// }


import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  role: "USER" | "CREATOR";
}

export default function RoleGuard({ children, role }: RoleGuardProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // Authorized
  return <>{children}</>;
}
