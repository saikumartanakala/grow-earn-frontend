import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function ViewerEarnings() {
  const [earnings, setEarnings] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/viewer/earnings", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch earnings");
        return res.json();
      })
      .then(data => setEarnings(data.moneyEarnings ?? 0))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Earnings</h1>
        <div className="bg-white p-6 rounded shadow">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {earnings !== null && !loading && !error && (
            <p>Your earnings: ₹{earnings}</p>
          )}
        </div>
      </div>
    </div>
  );
}
