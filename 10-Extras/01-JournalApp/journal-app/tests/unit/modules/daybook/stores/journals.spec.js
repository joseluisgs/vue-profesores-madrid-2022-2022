// https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store

import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
// import fs from 'fs'

import JournalStore from '@/modules/daybook/stores/journal'
import entries from './mocks/entries.mocks'

describe('Journal Store Tests', () => {
  let journalStore

  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    // creamos la store
    journalStore = JournalStore()
    // le metemos unas entradas
    journalStore.clearData()
    journalStore.entries = entries
  })

  test('El estado inicial debe ser con estradas a vacío y loading a false', () => {
    expect(journalStore.isLoading).toBe(false)
    expect(journalStore.entries).toEqual(entries)
    expect(journalStore.entries.length).toBe(entries.length)
  })

  // Getters test
  test('El getter by term devuleve una entrada', () => {
    const entry = journalStore.getEntriesByTerm('sit voluptatem accusantium doloremque laudantium')
    expect(entry.length).toBe(1)
    expect(entry[0]).toEqual(entries[1])
  })

  test('El getter by term devuleve todas las entradas', () => {
    const entry = journalStore.getEntriesByTerm('')
    expect(entry.length).toBe(3)
    expect(entry).toEqual(entries)
  })

  test('El getter by id devuelve la entrada', () => {
    const entry = journalStore.getEntryById('1')
    expect(entry).toEqual(entries[0])
  })

  test('El getter by id no devuelve la entrada', () => {
    const entry = journalStore.getEntryById('caca-test-que-hago')
    expect(entry).toEqual(undefined)
  })

  // acciones síncronas de manejo de cache local
  test('isLoading debe cambiar', () => {
    expect(journalStore.isLoading).toBe(false)
    journalStore.setLoading(true)
    expect(journalStore.isLoading).toBe(true)
    journalStore.setLoading(false)
    expect(journalStore.isLoading).toBe(false)
  })

  test('debe limpiar todos los datos', () => {
    expect(journalStore.entries.length).toBe(3)
    journalStore.clearData()
    expect(journalStore.entries.length).toBe(0)
  })

  // CRUD: Entries
  test('create debe crear una entrada', () => {
    const size = journalStore.entries.length
    journalStore.create({
      id: 'test',
      text: 'test',
      date: '2020-01-01',
    })
    expect(journalStore.entries.length).toBe(size + 1)
    expect(journalStore.entries[size].text).toBe('test')
    const entry = journalStore.entries.find((e) => e.id === 'test')
    expect(entry).toBeDefined()
  })

  test('update debe actualizar una entrada', () => {
    const size = journalStore.entries.length
    journalStore.update({
      id: '1',
      text: 'test',
      date: '2020-01-01',
    })
    expect(journalStore.entries.length).toBe(size)
    expect(journalStore.entries[0].text).toBe('test')
  })

  test('delete debe eliminar una entrada', () => {
    const size = journalStore.entries.length
    journalStore.delete('1')
    expect(journalStore.entries.length).toBe(size - 1)
  })
})

// Me llevo los test asincronos, porque luego serán con firebase para que no pare los síncronos en otra suite
describe('Journal Store Tests Async', () => {
  // Simulo la espera....
  let journalStore
  // const filePath = `${__dirname}/mocks/kaka.jpg`
  // const file = fs.readFileSync(filePath)

  beforeEach(() => {
    setActivePinia(createPinia())
    // creamos la store
    journalStore = JournalStore()
    // le metemos unas entradas
    journalStore.clearData()
    journalStore.entries = entries
  })

  // Acciones asincronas
  test('fetchEntries debe cargar las entradas', async () => {
    await journalStore.fetchEntries()
    expect(journalStore.entries.length).toBeGreaterThan(0)
  })

  test('createEntry debe crear la entradas sin imagenes', async () => {
    const size = journalStore.entries.length
    await journalStore.createEntry(
      {
        id: 'test',
        text: 'test',
        date: '2020-01-01',
      },
      null
    )
    expect(journalStore.entries.length).toBe(size + 1)
    expect(journalStore.entries[size].text).toBe('test')
    const entry = journalStore.entries.find((e) => e.id === 'test')
    expect(entry).toBeDefined()
  })

  test('updateEntry debe actualizar la entradas sin imagenes', async () => {
    const size = journalStore.entries.length
    await journalStore.updateEntry(
      {
        id: '1',
        text: 'test',
        date: '2020-01-01',
      },
      null
    )
    expect(journalStore.entries.length).toBe(size)
    expect(journalStore.entries[0].text).toBe('test')
  })

  test('deleteEntry debe eliminar la entradas sin imagenes', async () => {
    const size = journalStore.entries.length
    await journalStore.deleteEntry('1')
    expect(journalStore.entries.length).toBe(size - 1)
  })

  // test('createEntry debe crear la entradas con imagenes', async () => {
  //   const size = journalStore.entries.length
  //   await journalStore.createEntry(
  //     {
  //       id: 'test',
  //       text: 'test',
  //       date: '2020-01-01',
  //     },
  //     file
  //   )
  //   expect(journalStore.entries.length).toBe(size + 1)
  //   expect(journalStore.entries[size].text).toBe('test')
  // })

  // test('updateEntry debe actualizar la entradas con imagenes', async () => {
  //   const size = journalStore.entries.length
  //   await journalStore.updateEntry(
  //     {
  //       id: '1',
  //       text: 'test',
  //       date: '2020-01-01',
  //     },
  //     file
  //   )
  //   expect(journalStore.entries.length).toBe(size)
  //   expect(journalStore.entries[0].text).toBe('test')
  // })
})
