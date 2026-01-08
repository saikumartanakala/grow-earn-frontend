import React from "react";
import type { TaskItem } from "../../services/viewerService";

type Props = {
  task: TaskItem;
  onClaim: (taskId: string) => void;
};

export default function TaskCard({ task, onClaim }: Props) {
  return (
    <div className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}
        {typeof task.reward !== "undefined" && (
          <p className="text-sm text-indigo-600 mt-2">Reward: {task.reward}</p>
        )}
      </div>

      <div className="mt-4 md:mt-0">
        {task.claimed ? (
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" disabled>
            Claimed
          </button>
        ) : (
          <button
            onClick={() => onClaim(task.id)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Claim
          </button>
        )}
      </div>
    </div>
  );
}
