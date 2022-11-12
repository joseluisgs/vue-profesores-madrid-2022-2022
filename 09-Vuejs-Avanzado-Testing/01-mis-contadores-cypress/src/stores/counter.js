import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCounterStore = defineStore('CounterStore', () => {
  // Estado reactivo
  const counter = ref(0)

  // Getters (como computed properties)
  const doubleCount = computed(() => counter.value * 2)
  const isEven = computed(() => counter.value % 2 === 0)
  const isOdd = computed(() => counter.value % 2 !== 0)
  const actualValue = computed(() => counter.value)

  const setCounter = (value) => {
    counter.value = value
  }

  // Metodos de acción
  function increment() {
    counter.value++
  }

  const decrement = () => {
    counter.value--
  }

  async function incrementAsync(value = 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * value))
    counter.value += value
  }

  async function decrementAsync(value = 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * value))
    counter.value -= value
  }

  function loadFromStorage() {
    const storage = localStorage.getItem('counter')
    if (storage) {
      counter.value = parseInt(storage, 10)
    }
  }
  const saveToStorage = () => {
    localStorage.setItem('counter', counter.value)
  }

  watch(counter, (newValue) => {
    console.log('Counter changed to', newValue)
    saveToStorage(newValue)
  })

  // Y aquí tenemos las cosas publicas
  return {
    doubleCount,
    increment,
    isEven,
    isOdd,
    decrement,
    incrementAsync,
    decrementAsync,
    loadFromStorage,
    saveToStorage,
    actualValue,
    setCounter,
  }
})
