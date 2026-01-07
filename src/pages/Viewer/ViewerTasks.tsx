import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

export default function ViewerTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/viewer/tasks")
      .then(res => setTasks(res.data))
      .finally(() => setLoading(false));
  }, []);

  const completeTask = async (task: any) => {
    window.open(task.targetLink, "_blank");

    await api.post(`/viewer/tasks/${task.id}/complete`);

    setTasks(tasks.filter(t => t.id !== task.id));
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

        {loading && <p>Loading...</p>}

        {!loading && tasks.length === 0 && (
          <p>No tasks available right now.</p>
        )}

        {tasks.map(task => (
          <div
            key={task.id}
            className="bg-white p-4 mb-4 rounded shadow"
          >
            <p><b>Task Type:</b> {task.taskType}</p>

            <button
              onClick={() => completeTask(task)}
              className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
            >
              Complete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
