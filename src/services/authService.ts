import api from "./api";

export const loginApi = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const signupApi = async (
  email: string,
  password: string,
  role: "USER" | "CREATOR"
) => {
  const res = await api.post("/auth/signup", { email, password, role });
  return res.data;
};
