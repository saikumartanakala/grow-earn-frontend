import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import type { TaskItem } from "../../services/viewerService";

export default function ViewerTasks() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // zero-based page
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/viewer/tasks?page=${page}&size=${pageSize}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setTasks(data.tasks || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setTasks([]);
        setTotalPages(1);
        console.error("Failed to load tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [page]);

  const completeTask = async (task: TaskItem) => {
    const targetLink = (task.targetLink || task.target_link) as string | undefined;
    if (targetLink && typeof targetLink === "string" && targetLink.startsWith("http")) {
      window.open(targetLink, "_blank");
    } else {
      alert("No valid link for this task.");
      return;
    }

    await api.post(`/viewer/tasks/${task.id}/complete`);
    // Refetch current page after completion
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/viewer/tasks?page=${page}&size=${pageSize}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data.tasks || []);
    setTotalPages(data.totalPages || 1);
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
        {loading && <p>Loading...</p>}
        {!loading && tasks.length === 0 && (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-lg font-semibold mb-2">No tasks available right now.</p>
            <p className="text-gray-600">Welcome! You currently have no assigned tasks. Once a campaign assigns you a task, it will appear here. Check back soon or explore other features!</p>
          </div>
        )}
        {tasks.map(task => (
          <div
            key={task.id}
            className="bg-white p-4 mb-4 rounded shadow"
          >
            <p><b>Task Type:</b> {(task as any).taskType || (task as any).task_type || task.title || "Task"}</p>
            <button
              onClick={() => completeTask(task)}
              className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
            >
              Complete Task
            </button>
          </div>
        ))}
        {/* Pagination Controls */}
        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              className="px-3 py-1 rounded bg-gray-200"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${page === i ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

