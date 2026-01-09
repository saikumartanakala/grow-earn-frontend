import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import viewerService from "../../services/viewerService";
import type { DashboardResponse, TaskItem } from "../../services/viewerService";

type StatsFields = {
  totalSubscriptions?: number;
  videoViews?: number;
  shortViews?: number;
  videoLikes?: number;
  videoComments?: number;
  shortLikes?: number;
  shortComments?: number;
  moneyEarnings?: number;
};
import TaskCard from "./TaskCard";
import StatsCard from "./StatsCard";

export default function ViewerDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await viewerService.getViewerDashboard();
      console.log("viewer/dashboard ->", res);
      // Defensive: check for required stats fields
      const stats: StatsFields = res && typeof res === "object" ? (res as any) : {};
      const requiredFields = [
        "totalSubscriptions",
        "videoViews",
        "shortViews",
        "videoLikes",
        "videoComments",
        "shortLikes",
        "shortComments",
        "moneyEarnings",
      ];
      const missing = requiredFields.filter((f) => typeof stats[f as keyof StatsFields] === "undefined");
      if (missing.length > 0) {
        setError(`Missing fields in API response: ${missing.join(", ")}`);
      }
      setData(res);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
      setError("Failed to load dashboard. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleClaim = async (taskId: string) => {
    try {
      await viewerService.claimTask(taskId);
      // optimistic update: mark claimed
      setData((d) => {
        if (!d) return d;
        return {
          ...d,
          tasks: d.tasks?.map((t) =>
            t.id === taskId ? { ...t, claimed: true } : t
          ),
        };
      });
    } catch (err) {
      console.error("Claim failed:", err);
      alert("Failed to claim task. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Viewer Dashboard
        </h1>

        {loading && <p>Loading dashboard...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Map new stats fields to cards */}
              <StatsCard label="Total Subscriptions" value={(data as any).totalSubscriptions ?? 0} />
              <StatsCard label="Video Views" value={(data as any).videoViews ?? 0} />
              <StatsCard label="Short Views" value={(data as any).shortViews ?? 0} />
              <StatsCard label="Video Likes" value={(data as any).videoLikes ?? 0} />
              <StatsCard label="Video Comments" value={(data as any).videoComments ?? 0} />
              <StatsCard label="Short Likes" value={(data as any).shortLikes ?? 0} />
              <StatsCard label="Short Comments" value={(data as any).shortComments ?? 0} />
              <StatsCard label="Money Earnings" value={(data as any).moneyEarnings ?? 0} />
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>

              {Array.isArray((data as any).tasks) && (data as any).tasks.length > 0 ? (
                <div className="space-y-4">
                  {(data as any).tasks.map((t: TaskItem) => (
                    <TaskCard key={t.id} task={t} onClaim={handleClaim} />
                  ))}
                </div>
              ) : (
                <p>No tasks available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
