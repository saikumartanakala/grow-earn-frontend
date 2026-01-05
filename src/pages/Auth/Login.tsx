import { useState } from "react";
import { loginApi } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      if (res.role === "CREATOR") {
        window.location.href = "/creator/dashboard";
      } else {
        window.location.href = "/user/dashboard";
      }
    } catch {
      setError("Invalid email or password");
    }
  };
  <p className="text-sm text-center mt-4">
  Don’t have an account?{" "}
  <a href="/signup" className="text-blue-600 hover:underline">
    Signup
  </a>
</p>


  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button>Login</button>
    </form>
  );
}


