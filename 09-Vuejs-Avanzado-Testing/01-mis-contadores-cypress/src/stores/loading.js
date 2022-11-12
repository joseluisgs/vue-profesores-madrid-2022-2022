import { defineStore } from 'pinia'

export const LoadingStore = defineStore({
  id: 'LoadingStore',
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(state) {
      this.isLoading = state
    },
  },
})
