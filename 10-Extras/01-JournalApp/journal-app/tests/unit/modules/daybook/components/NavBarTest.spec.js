import { beforeEach, describe, expect, test } from 'vitest'

import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'

import NavBar from '@/modules/daybook/components/NavBar.vue'

import users from '../stores/mocks/users.mocks'

// Para esperar las promesas pendientes tambien puedes usar: https://www.npmjs.com/package/flush-promises
// import { setImmediate } from 'timers'
// const flushPromises = () => new Promise(setImmediate)

describe('Daybook Componente -> NavBar', () => {
  let wrapper
  const router = createRouterMock()

  beforeEach(() => {
    injectRouterMock(router)
    wrapper = shallowMount(NavBar, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
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

  test('Debe mostrar el nombre del usuario', () => {
    const button = wrapper.find('[data-testid="navbar-button-logout"]')
    expect(button.text()).toBe(users[0].username)
  })

  test('Debe llevar a home al pulsar el boton', async () => {
    const button = wrapper.find('[data-testid="navbar-button-home"]')
    expect(button.text()).toBe('DayBook')
    await button.trigger('click')
    expect(router.push).toHaveBeenCalledWith({ name: 'home' })
  })

  test('Debe hacer logout', async () => {
    const button = wrapper.find('[data-testid="navbar-button-logout"]')
    expect(button.text()).toBe(users[0].username)
    await button.trigger('click')
    expect(wrapper.vm.userStore.logOut).toHaveBeenCalled()
    // await flushPromises()
  })

  test('Debe hacer login', async () => {
    wrapper = shallowMount(NavBar, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              UserStore: { user: null },
            },
          }),
        ],
      },
    })
    const button = wrapper.find('[data-testid="navbar-button-login"]')
    await button.trigger('click')
    expect(wrapper.vm.userStore.logIn).toHaveBeenCalled()
    // await flushPromises()
  })
})
