import { beforeEach, describe, expect, test } from 'vitest'

import EntryList from '@/modules/daybook/components/EntryList.vue'

import { shallowMount } from '@vue/test-utils'

// Suite de Test
// Necesitamos Pinia para que funcione el test
// Necesitamos router para que funcione el test
import { createTestingPinia } from '@pinia/testing'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'

import entries from '../stores/mocks/entries.mocks'

describe('Daybook Componente -> EntryList', () => {
  let wrapper
  const router = createRouterMock()

  beforeEach(() => {
    injectRouterMock(router)
    wrapper = shallowMount(EntryList, {
      // Le asignamos un estado inicial a la estore mock de prueba JournalStore
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              JournalStore: { entries: entries },
            },
          }),
        ],
      },
    })
  })

  test('Debe hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Debe mostrar una lista de entradas', () => {
    const entriesByTerm = wrapper.vm.entriesByTerm
    expect(entriesByTerm).toEqual(entries)
    const entriesListItems = wrapper.findAll('[data-testid="entrylist-item"]')
    expect(entriesListItems.length).toBe(entries.length)
  })

  test('Debe mostrar una lista de entradas filtradas por una palabra clave', async () => {
    const input = wrapper.find('[data-testid="entrylist-input"]')
    input.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
    await input.trigger('input')
    const entriesByTerm = wrapper.vm.entriesByTerm
    expect(entriesByTerm).toEqual([entries[0]])
    const entriesListItems = wrapper.findAll('[data-testid="entrylist-item"]')
    expect(entriesListItems.length).toBe(1)
  })

  test('Al pulsar el botón de nuevo debe ir a nueva entrada', async () => {
    const button = wrapper.find('[data-testid="entrylist-new"]')
    await button.trigger('click')
    expect(router.push).toHaveBeenCalledWith({ name: 'daybook-entry', params: { id: 'new' } })
  })

  test('Al un item de la lista debe ir a la vista de esa entrada', async () => {
    // Cogemos el primero de la lista
    const entryListItem = wrapper.find('[data-testid="entrylist-item"]')
    await entryListItem.trigger('click')
    expect(router.push).toHaveBeenCalledWith({
      name: 'daybook-entry',
      params: { id: entries[0].id },
    })
  })
})
