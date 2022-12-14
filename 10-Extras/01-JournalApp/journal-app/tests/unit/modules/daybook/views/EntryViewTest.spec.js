import { beforeEach, describe, expect, test, vi } from 'vitest'

import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'

import EntryView from '@/modules/daybook/views/EntryView.vue'

import Swal from 'sweetalert2'

// Para esperar las promesas pendientes tambien puedes usar: https://www.npmjs.com/package/flush-promises
import { setImmediate } from 'timers'
const flushPromises = () => new Promise(setImmediate)

import entries from '../stores/mocks/entries.mocks'
import users from '../stores/mocks/users.mocks'

describe('Daybook Componente -> EntryView con New', () => {
  let wrapper
  const router = createRouterMock()

  beforeEach(() => {
    vi.restoreAllMocks()
    injectRouterMock(router)
    wrapper = shallowMount(EntryView, {
      props: {
        id: 'new',
      },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              JournalStore: { entries: entries },
              UserStore: { user: users[0] },
            },
          }),
        ],
      },
    })
  })

  test('Debe hacer match con el snapshot', () => {
    expect(wrapper.text()).toMatchSnapshot()
  })

  test('El campo de texto debe estar vacío', () => {
    const textinput = wrapper.find('[data-testid="entryview-textinput"]')
    expect(textinput.element.value).toBe('')
  })

  test('El boton borrar no debe estar visible', () => {
    const deleteButton = wrapper.find('[data-testid="entryview-deletebutton"]')
    expect(deleteButton.exists()).toBe(false)
  })

  test('Debe crear una entrada nueva y redirigirnos a ella', async () => {
    const textinput = wrapper.find('[data-testid="entryview-textinput"]')
    textinput.setValue('text-new')
    await textinput.trigger('input')
    const saveButton = wrapper.find('[data-testid="entryview-savebutton"]')
    // pulsamos click
    await saveButton.trigger('click')
    expect(wrapper.vm.journalStore.createEntry).toHaveBeenCalled()
    // Nos debe llevar a esta entrada
    expect(router.push).toHaveBeenCalledWith({
      name: 'daybook-entry',
      params: { id: expect.any(String) },
    })
  })
})

describe('Daybook Componente -> EntryView con id', () => {
  let wrapper
  const router = createRouterMock()

  beforeEach(() => {
    vi.restoreAllMocks()
    injectRouterMock(router)
    wrapper = shallowMount(EntryView, {
      props: {
        id: entries[0].id,
      },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              JournalStore: { entries: entries },
              UserStore: { user: users[0] },
            },
          }),
        ],
      },
    })
  })

  test('Debe hacer match con el snapshot', () => {
    expect(wrapper.text()).toMatchSnapshot()
  })

  test('Debe debe cargar la entrada si existe', () => {
    expect(wrapper.vm.myEntry).toEqual(entries[0])
  })

  test('El campo de texto debe coicidir con la entrada', () => {
    const textinput = wrapper.find('[data-testid="entryview-textinput"]')
    expect(textinput.element.value).toBe(entries[0].text)
  })

  test('El boton borrar si debe estar visible', () => {
    const deleteButton = wrapper.find('[data-testid="entryview-deletebutton"]')
    expect(deleteButton.exists()).toBe(true)
  })

  test('Debe borrar la entrada si pulsamos el boton borrar', async () => {
    const deleteButton = wrapper.find('[data-testid="entryview-deletebutton"]')
    expect(deleteButton.exists()).toBe(true)
    // Mockeamos el sweetalert
    Swal.fire = vi.fn().mockImplementation(() => Promise.resolve({ isConfirmed: true }))
    await deleteButton.trigger('click')
    // Nos debe llevar a esta entrada
    expect(wrapper.vm.journalStore.deleteEntry).toHaveBeenCalledWith(entries[0])
    await flushPromises()
    expect(router.push).toHaveBeenCalledWith({ name: 'daybook-no-entry' })
  })

  test('Debe actualizar la entrada', async () => {
    const textinput = wrapper.find('[data-testid="entryview-textinput"]')
    textinput.setValue('text-updated')
    await textinput.trigger('input')
    const saveButton = wrapper.find('[data-testid="entryview-savebutton"]')
    // pulsamos click
    await saveButton.trigger('click')
    expect(wrapper.vm.journalStore.updateEntry).toHaveBeenCalled()
    // await flushPromises()
  })
})

describe('Daybook Componente -> EntryView con id no existe', () => {
  const router = createRouterMock()

  beforeEach(() => {
    vi.restoreAllMocks()
    injectRouterMock(router)
  })

  test('No debe existir la entrada', () => {
    let wrapper
    try {
      wrapper = shallowMount(EntryView, {
        // De esta manera mockeamos el onMounted
        props: {
          id: 'caca',
        },
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                JournalStore: { entries: entries },
                UserStore: { user: users[0] },
              },
            }),
          ],
        },
      })
    } catch (e) {
      // Si no llega aquí es que no se ha renderizado, por lo que está bien!!!
      expect(wrapper).toBeUndefined()
    }
  })
})
