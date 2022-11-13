import { defineStore } from 'pinia'

export const useLoadingStore = defineStore({
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
