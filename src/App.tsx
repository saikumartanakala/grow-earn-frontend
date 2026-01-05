// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/login";

// import UserDashboard from "./pages/User/UserDashboard";
// import CreatorDashboard from "./pages/Creator/CreatorDashboard";

// import RoleGuard from "./routes/RoleGuard";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Default route */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* Auth */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/login" element={<Signup />} />

//         {/* User */}
//         <Route
//           path="/user/dashboard"
//           element={
//             <RoleGuard role="USER">
//               <UserDashboard />
//             </RoleGuard>
//           }
//         />

//         {/* Creator */}
//         <Route
//           path="/creator/dashboard"
//           element={
//             <RoleGuard role="CREATOR">
//               <CreatorDashboard />
//             </RoleGuard>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";





import UserDashboard from "./pages/User/UserDashboard";
import CreatorDashboard from "./pages/Creator/CreatorDashboard";

import RoleGuard from "./routes/RoleGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → Signup */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* User */}
        <Route
          path="/user/dashboard"
          element={
            <RoleGuard role="USER">
              <UserDashboard />
            </RoleGuard>
          }
        />

        {/* Creator */}
        <Route
          path="/creator/dashboard"
          element={
            <RoleGuard role="CREATOR">
              <CreatorDashboard />
            </RoleGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
