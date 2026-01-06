import { Link } from "react-router-dom";

type NavbarProps = {
  role: "CREATOR" | "Viewer";
};

export default function Navbar({ role }: NavbarProps) {
  return (
    <nav className="w-full bg-purple-700 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">
        {role === "CREATOR" ? "Creator Panel 🎨" : "Viewer Panel 👤"}
      </h1>

      <ul className="flex gap-6">
        <li>
          <Link to="#" className="hover:text-purple-200">Field1</Link>
        </li>
        <li>
          <Link to="#" className="hover:text-purple-200">Field2</Link>
        </li>
        <li>
          <Link to="#" className="hover:text-purple-200">Field3</Link>
        </li>
        <li>
          <Link to="#" className="hover:text-purple-200">Field4</Link>
        </li>
        <li>
          <Link to="#" className="hover:text-purple-200">Field5</Link>
        </li>
      </ul>
    </nav>
  );
}
