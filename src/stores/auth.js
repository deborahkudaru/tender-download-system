import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),

  actions: {
    signup(username, password) {
      const newUser = { username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      this.user = newUser;
    },

    login(username, password) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.username === username &&
        storedUser.password === password
      ) {
        this.user = storedUser;
        return true;
      }
      return false;
    },

    logout() {
      localStorage.removeItem("user");
      this.user = null;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
