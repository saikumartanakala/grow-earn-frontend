import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

interface CreatorStats {
  totalViews: number;
  totalFollowers: number;
  totalEarnings: number;
}

export default function CreatorDashboard() {
  const [stats, setStats] = useState<CreatorStats | null>(null);

  useEffect(() => {
    api.get("/creator/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Creator Dashboard 🎨
        </h1>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Total Views</h2>
              <p className="text-2xl">{stats.totalViews}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Followers</h2>
              <p className="text-2xl">{stats.totalFollowers}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Earnings</h2>
              <p className="text-2xl">₹{stats.totalEarnings}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
