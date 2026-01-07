import api from "./api";

export const loginApi = async (
  email: string,
  password: string,
  role: "USER" | "CREATOR"
) => {
  const res = await api.post("/auth/login", {
    email,
    password,
    role,
  });
  return res.data;
};

