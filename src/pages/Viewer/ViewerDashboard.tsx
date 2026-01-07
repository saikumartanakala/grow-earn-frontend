import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

export default function ViewerDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/viewer/dashboard").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Viewer Dashboard 👤
        </h1>

        {data && (
          <div className="bg-white p-6 rounded shadow">
            <p>User ID: {data.userId}</p>
            <p>Status: {data.status}</p>
            <p>{data.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
