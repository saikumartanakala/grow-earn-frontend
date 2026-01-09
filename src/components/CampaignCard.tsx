import React from "react";
import type { Campaign } from "../services/campaignService";
import ProgressBar from "./ProgressBar";

interface Props {
  campaign: Campaign;
  onMarkComplete: (id: string) => void;
}

export default function CampaignCard({ campaign, onMarkComplete }: Props) {
  const percent = (campaign.currentAmount / campaign.goalAmount) * 100;
  const canMarkComplete = percent >= 100 && campaign.status === "in-progress";

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{campaign.title}</h3>
          {campaign.description && (
            <p className="text-sm text-gray-600">{campaign.description}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Goal</div>
          <div className="font-medium">₹{campaign.goalAmount}</div>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar percent={percent} label={`Raised: ₹${campaign.currentAmount}`} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">Updated: {new Date(campaign.updatedAt).toLocaleString()}</div>
        <div>
          {campaign.status === "in-progress" && (
            <button
              onClick={() => onMarkComplete(campaign.id)}
              disabled={!canMarkComplete}
              className={`px-3 py-1 rounded text-sm text-white ${
                canMarkComplete ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Mark Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
