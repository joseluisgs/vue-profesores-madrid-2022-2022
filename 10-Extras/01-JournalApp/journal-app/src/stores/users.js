import users from '@/data/users'
import espera from '@/helpers/espera'
import JournalStore from '@/modules/daybook/stores/journal'
import { defineStore } from 'pinia'

export const UserStore = defineStore({
  id: 'UserStore',
  state: () => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
  },

  actions: {
    setUser(user) {
      this.user = user
    },

    async logIn() {
      await espera(500)
      // TODO: Compruebas la sesión en remoto o Firebase
      this.setUser(users[0])
      // Le cargamos las entradas del usuario!!!
      const journalStore = JournalStore()
      journalStore.fetchEntries()
    },

    async logOut() {
      await espera(1000) // Solo por perder el tiempo y parezca asincrono
      // Le limpiamos los datos del usuario!!!
      const journalStore = JournalStore()
      journalStore.clearData()
      this.setUser(null)
    },
  },
})

export default UserStore
