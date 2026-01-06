

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // "viewer" | "creator"

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-purple-700 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">
        {role === "creator" ? "Creator Panel 🎨" : "Viewer Panel 👀"}
      </h1>

      <ul className="flex gap-6 items-center">
        {role === "creator" ? (
          <>
            <li><Link to="/creator/dashboard">Dashboard</Link></li>
            <li><Link to="#">Field2</Link></li>
            <li><Link to="#">Field3</Link></li>
            <li><Link to="#">Field4</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/viewer/dashboard">Dashboard</Link></li>
            <li><Link to="#">Field2</Link></li>
            <li><Link to="#">Field3</Link></li>
            <li><Link to="#">Field4</Link></li>
          </>
        )}

        <li>
          <button
            onClick={handleLogout}
            className="bg-purple-500 px-3 py-1 rounded-md hover:bg-purple-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
