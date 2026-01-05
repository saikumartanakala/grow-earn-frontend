// import { useState } from "react";
// import api from "../../services/api";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState<"USER" | "CREATOR">("USER");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       await api.post("/auth/signup", { email, password, role });
//       setSuccess("Signup successful. Please login.");
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={email} onChange={e => setEmail(e.target.value)} />
//       <input value={password} onChange={e => setPassword(e.target.value)} />
//       <select value={role} onChange={e => setRole(e.target.value as any)}>
//         <option value="USER">User</option>
//         <option value="CREATOR">Creator</option>
//       </select>
//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}
//       <button>Signup</button>
//     </form>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "CREATOR">("USER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
        role,
      });

      // ✅ AUTO LOGIN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ REDIRECT BASED ON ROLE
      if (res.data.role === "USER") {
        navigate("/user/dashboard");
      } else {
        navigate("/creator/dashboard");
      }

    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "USER" | "CREATOR")}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="USER">User</option>
            <option value="CREATOR">Creator</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
