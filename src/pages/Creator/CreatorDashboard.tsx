import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import type { Campaign } from "../../services/campaignService";
import { getCompletedCampaigns, getInProgressCampaigns, markCampaignCompleted } from "../../services/campaignService";
import api from "../../services/api";
import CampaignCard from "../../components/CampaignCard";

type Tab = "in-progress" | "completed";
type CampaignStatus = "IN_PROGRESS" | "COMPLETED";

export default function CreatorDashboard() {
  const [tab, setTab] = useState<Tab>("in-progress");
  const [inProgress, setInProgress] = useState<Campaign[]>([]);
  const [completed, setCompleted] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const pollingRef = useRef<number | null>(null);


  // Fetch campaigns by status
  const fetchCampaigns = async (status: CampaignStatus) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/creator/campaigns/list?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const campaigns = Array.isArray(res.data) ? res.data : res.data.campaigns ?? [];
      if (status === "IN_PROGRESS") setInProgress(campaigns);
      else setCompleted(campaigns);
    } catch (err) {
      console.error(err);
      alert("Failed to load campaigns. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch both lists (for initial load/polling)
  const fetchAll = useCallback(async () => {
    await Promise.all([fetchCampaigns("IN_PROGRESS"), fetchCampaigns("COMPLETED")]);
  }, []);

  useEffect(() => {
    fetchAll();

    // polling fallback
    const interval = 15000; // 15s
    pollingRef.current = window.setInterval(() => {
      fetchAll();
    }, interval);

    return () => {
      if (pollingRef.current) window.clearInterval(pollingRef.current);
    };
  }, [fetchAll]);

  // optional websocket real-time updates (if VITE_WS_URL is set)
  useEffect(() => {
    const wsUrl = (import.meta.env.VITE_WS_URL as string) || "";
    if (!wsUrl) return;

    let ws: WebSocket | null = null;
    try {
      const token = localStorage.getItem("token");
      const sep = wsUrl.includes("?") ? "&" : "?";
      const urlWithToken = token ? `${wsUrl}${sep}token=${token}` : wsUrl;
      ws = new WebSocket(urlWithToken);
      ws.addEventListener("message", (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          const { campaignId, currentAmount, updatedAt } = msg;
          setInProgress((prev) =>
            prev.map((c) => (c.id === campaignId ? { ...c, currentAmount, updatedAt } : c))
          );
          setCompleted((prev) =>
            prev.map((c) => (c.id === campaignId ? { ...c, currentAmount, updatedAt } : c))
          );
        } catch (e) {
          // ignore malformed
        }
      });
    } catch (e) {
      console.warn("WebSocket connection failed, using polling fallback.");
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleMarkComplete = async (id: string) => {
    // optimistic update
    const target = inProgress.find((c) => c.id === id);
    if (!target) return;

    setInProgress((prev) => prev.filter((c) => c.id !== id));
    setCompleted((prev) => [{ ...target, status: "completed" }, ...prev]);

    try {
      await markCampaignCompleted(id);
    } catch (err) {
      // rollback on failure
      setCompleted((prev) => prev.filter((c) => c.id !== id));
      setInProgress((prev) => [target, ...prev]);
      console.error(err);
      alert("Failed to mark campaign completed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Creator Dashboard</h1>

        <div className="mb-6">
          <div className="inline-flex rounded bg-white shadow">
            <button
              onClick={async () => {
                setTab("in-progress");
                await fetchCampaigns("IN_PROGRESS");
              }}
              className={`px-4 py-2 ${tab === "in-progress" ? "bg-purple-600 text-white" : "text-gray-700"}`}
            >
              In Progress ({inProgress.length})
            </button>
            <button
              onClick={async () => {
                setTab("completed");
                await fetchCampaigns("COMPLETED");
              }}
              className={`px-4 py-2 ${tab === "completed" ? "bg-purple-600 text-white" : "text-gray-700"}`}
            >
              Completed Goals ({completed.length})
            </button>
          </div>
        </div>

        {loading && <div className="text-gray-600">Loading campaigns…</div>}

        {!loading && tab === "in-progress" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgress.length === 0 ? (
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-lg font-semibold mb-2">No in-progress campaigns yet.</p>
                <p className="text-gray-600">Welcome! You have not started any campaigns. Create a new campaign to get started and track your progress here.</p>
              </div>
            ) : (
              inProgress.map((c) => (
                <CampaignCard key={c.id} campaign={c} onMarkComplete={handleMarkComplete} />
              ))
            )}
          </div>
        )}

        {!loading && tab === "completed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completed.length === 0 ? (
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-lg font-semibold mb-2">No completed goals yet.</p>
                <p className="text-gray-600">Once you complete a campaign, it will appear here. Keep working towards your goals!</p>
              </div>
            ) : (
              completed.map((c) => <CampaignCard key={c.id} campaign={c} onMarkComplete={() => {}} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
