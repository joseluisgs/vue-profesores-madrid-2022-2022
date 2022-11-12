import { defineStore } from 'pinia'

// Mi contador como Store
export const CounterStore = defineStore({
  // Nombre del Store para poder depurarla con Vue DevTools
  id: 'CounterStore',

  // Estado inicial global reactivo compartido
  state: () => ({
    counter: 0,
  }),

  // Getters (como computed properties)
  getters: {
    doubleCount: (state) => state.counter * 2,
    isEven: (state) => state.counter % 2 === 0,
    isOdd: (state) => state.counter % 2 !== 0,
  },

  // Acciones: Mutaciones y acciones síncronas/asíncronas
  actions: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    async incrementAsync(value = 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * value))
      this.counter += value
    },
    async decrementAsync(value = 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * value))
      this.counter -= value
    },
    loadFromStorage() {
      const storage = localStorage.getItem('counter')
      if (storage) {
        this.counter = parseInt(storage, 10)
      }
    },
    saveToStorage() {
      localStorage.setItem('counter', this.counter)
    },
  },
})
