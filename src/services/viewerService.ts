import api from "./api";

export type UserInfo = {
  id: string;
  name?: string;
  email?: string;
  [key: string]: any;
};

export type StatItem = {
  key: string;
  label: string;
  value: number | string;
};

export type TaskItem = {
  id: string;
  title: string;
  description?: string;
  reward?: number;
  claimed?: boolean;
  [key: string]: any;
};

export type DashboardResponse = {
  user?: UserInfo;
  stats?: StatItem[];
  tasks?: TaskItem[];
};

export const getViewerDashboard = async () => {
  const res = await api.get<DashboardResponse>("/viewer/dashboard");
  return res.data;
};

export const claimTask = async (taskId: string) => {
  // best-effort: backend may expose a claim endpoint — try POST
  const res = await api.post(`/viewer/tasks/${taskId}/claim`);
  return res.data;
};

export default {
  getViewerDashboard,
  claimTask,
};
