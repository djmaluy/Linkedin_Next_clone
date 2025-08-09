import api from "./index";

type TUser = {
  id: string;
  name: string;
  email: string;
  token?: string;
};

type Endpoints = {
  fetchUsers: () => Promise<TUser>;
  googleSignIn: (accessToken: string) => Promise<TUser>;
};

const userEndpoints: Endpoints = {
  fetchUsers: async () => {
    return await api("/users");
  },
  googleSignIn: async (accessToken: string) => {
    return await api("/auth/google_oauth2", {
      method: "post",
      data: JSON.stringify({ access_token: accessToken }),
    });
  },
};

export default userEndpoints;
