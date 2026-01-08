import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import viewerService from "../../services/viewerService";
import type { DashboardResponse, TaskItem } from "../../services/viewerService";
import TaskCard from "./TaskCard";
import StatsCard from "./StatsCard";

export default function ViewerDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await viewerService.getViewerDashboard();
      setData(res);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
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

        {!loading && data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {(() => {
                const statsArray = Array.isArray(data.stats)
                  ? data.stats
                  : data.stats && typeof data.stats === "object"
                  ? Object.keys(data.stats).map((k) => {
                      const val = (data.stats as any)[k];
                      return {
                        key: k,
                        label: k,
                        value: typeof val === "object" ? JSON.stringify(val) : val,
                      };
                    })
                  : [];

                return statsArray.map((s) => (
                  <StatsCard key={s.key} label={s.label} value={s.value} />
                ));
              })()}
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>

              {Array.isArray(data.tasks) && data.tasks.length > 0 ? (
                <div className="space-y-4">
                  {data.tasks.map((t: TaskItem) => (
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
