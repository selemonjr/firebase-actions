import { defineStore } from 'pinia'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    
  }
})
