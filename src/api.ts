import { axiosAuth } from "./axios-auth";

const api = axiosAuth;

// Types
interface UserData {
  roles?: string[];
  uploadsRemaining?: number;
  isSuperUser?: boolean;
  [key: string]: any; // For other updateable fields
}

// User related endpoints
export const userApi = {
  create: (descopeUserId: string, descopeLoginIds: string[]) =>
    api.post("/api/v1/user/", { descopeUserId, descopeLoginIds }),

  get: (userId: string) => api.get(`/api/v1/user/${userId}`),

  delete: (userId: string) => api.delete(`/api/v1/user/${userId}`),

  update: (userId: string, data: UserData) =>
    api.put(`/api/v1/user/${userId}`, { data }),

  isRegistered: (descopeUserId: string) =>
    api.get(`/api/v1/user/${descopeUserId}/registered`),
};

// Server status
export const serverApi = {
  status: () => api.get("/status"),
};
