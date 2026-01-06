


// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Auth/Login";


// import ViewerDashboard from "./pages/Viewer/ViewerDashboard";





// import CreatorDashboard from "./pages/Creator/CreatorDashboard";

// import RoleGuard from "./routes/RoleGuard";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Default route → Signup */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Auth */}
//         <Route path="/login" element={<Login />} />

//         {/* Viewer */}
//         <Route
//   path="/viewer/dashboard"
//   element={
//     <RoleGuard role="USER">
//       <ViewerDashboard /> 
//     </RoleGuard>
//   }
// />

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
import ViewerDashboard from "./pages/Viewer/ViewerDashboard";
import CreatorDashboard from "./pages/Creator/CreatorDashboard";
import RoleGuard from "./routes/RoleGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Viewer */}
        <Route
          path="/viewer/dashboard"
          element={
            <RoleGuard role="viewer">
              <ViewerDashboard />
            </RoleGuard>
          }
        />

        {/* Creator */}
        <Route
          path="/creator/dashboard"
          element={
            <RoleGuard role="creator">
              <CreatorDashboard />
            </RoleGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
