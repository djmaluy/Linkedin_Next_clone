import api from "./index";

const userEndpoints = {
  fetchUsers: async () => {
    return await api("/users");
  },
};

export default userEndpoints;
