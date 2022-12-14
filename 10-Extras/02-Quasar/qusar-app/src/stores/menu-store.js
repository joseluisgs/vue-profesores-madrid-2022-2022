import { defineStore } from 'pinia'

const MenuStore = defineStore({
  id: 'MenuStore',

  state: () => ({
    leftDrawer: true,
  }),

  getters: {
    leftDrawerOpen: (state) => state.leftDrawer,
  },

  actions: {
    toggleLeftDrawer() {
      this.leftDrawer = !this.leftDrawer
    },
  },
})

export default MenuStore
