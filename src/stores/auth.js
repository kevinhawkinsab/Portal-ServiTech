import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    role: 'admin'
  }),
  actions: {
    setRole(role) {
      this.role = role;
    }
  },
  persist: true
});
