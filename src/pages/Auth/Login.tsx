import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Viewer" | "CREATOR">("Viewer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleContinue = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  // 🔑 MAP UI ROLE → BACKEND ROLE
  const backendRole = role === "Viewer" ? "USER" : "CREATOR";

  try {
    // 1️⃣ Check email + backend role
    const check = await api.post("/auth/check-email-role", {
      email,
      role: backendRole,
    });

    let res;

    if (check.data.exists) {
      // 2️⃣ LOGIN
      res = await api.post("/auth/login", {
        email,
        password,
        role: backendRole,
      });
    } else {
      // 3️⃣ SIGNUP
      res = await api.post("/auth/signup", {
        email,
        password,
        role: backendRole,
      });
    }

    // 4️⃣ SAVE SESSION
    localStorage.setItem("token", res.data.token);

    // 🔑 STORE UI ROLE (not backend role)
    const uiRole = backendRole === "USER" ? "viewer" : "creator";
    localStorage.setItem("role", uiRole);

    // 5️⃣ REDIRECT
    if (uiRole === "creator") {
      navigate("/creator/dashboard");
    } else {
      navigate("/viewer/dashboard");
    }
  } catch (err: any) {
    setError(
      err?.response?.data?.message || "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleContinue}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Log in or Sign up
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        {/* ROLE IS REQUIRED FOR BOTH */}
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "Viewer" | "CREATOR")
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="Viewer">Viewer</option>
          <option value="CREATOR">Creator</option>
        </select>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          {loading ? "Please wait..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
