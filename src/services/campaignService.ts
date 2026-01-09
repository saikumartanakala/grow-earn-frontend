import api from "./api";

export interface Campaign {
  id: string;
  title: string;
  description?: string;
  goalAmount: number;
  currentAmount: number;
  status: "in-progress" | "completed";
  updatedAt: string;
}


export const getInProgressCampaigns = async (): Promise<Campaign[]> => {
  const res = await api.get("/creator/campaigns?status=in-progress");
  const data = res.data;
  if (Array.isArray(data)) return data;
  return data.campaigns ?? [];
};


export const getCompletedCampaigns = async (): Promise<Campaign[]> => {
  const res = await api.get("/creator/campaigns?status=completed");
  const data = res.data;
  if (Array.isArray(data)) return data;
  return data.campaigns ?? [];
};

export const markCampaignCompleted = async (id: string) => {
  const res = await api.post(`/creator/campaign/${id}/mark-completed`);
  return res.data;
};
