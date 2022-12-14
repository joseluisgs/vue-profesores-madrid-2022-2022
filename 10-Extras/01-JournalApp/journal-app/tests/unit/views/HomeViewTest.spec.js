import { beforeEach, describe, expect, test, vi } from 'vitest'

import HomeView from '@/views/HomeView.vue'
import { shallowMount } from '@vue/test-utils'

import { createRouterMock, injectRouterMock } from 'vue-router-mock'

// Vamos a usar https://github.com/posva/vue-router-mock#testing-libraries

describe('View -> HomeView', () => {
  // Porque e sVitest debemos configurarlo así
  // const router = createRouterMock({
  //   spy: {
  //     create: (fn) => vi.fn(fn),
  //     reset: (spy) => spy.mockReset(),
  //   },
  // })
  // Si usamos globals no es necesario todo esto
  const router = createRouterMock()

  let wrapper

  beforeEach(() => {
    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router)
    wrapper = shallowMount(HomeView)
  })

  test('Debe hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot() // snapshot es una imagen de la vista y podemos usar .element tambien o html()
  })

  test('Debe hacer click el botón de Daybook', async () => {
    // Mockeramos el método
    wrapper.vm.goToDaybook = vi.fn()

    const dayButton = wrapper.find('[data-testid="DayButton"]')
    expect(dayButton.exists()).toBe(true)

    expect(dayButton.text()).toBe('DayBook')
    await dayButton.trigger('click')

    expect(wrapper.vm.goToDaybook).toHaveBeenCalledTimes(1)
  })

  test('Debe hacer click el botón de About', async () => {
    // Mockeramos el método
    wrapper.vm.goToAbout = vi.fn()

    const dayButton = wrapper.find('[data-testid="AboutButton"]')
    expect(dayButton.exists()).toBe(true)

    expect(dayButton.text()).toBe('About')
    await dayButton.trigger('click')

    expect(wrapper.vm.goToAbout).toHaveBeenCalledTimes(1)
  })

  test('debe hacer click en el botón debe redireccionar a daybook-no-entry', async () => {
    // Trabajamos con el boton
    const dayButton = wrapper.find('[data-testid="DayButton"]')
    expect(dayButton.exists()).toBe(true)

    expect(dayButton.text()).toBe('DayBook')
    await dayButton.trigger('click')

    expect(router.push).toHaveBeenCalledWith({ name: 'daybook-no-entry' })
  })

  test('Debe hacer click en el botón debe redireccionar a about', async () => {
    // Trabajamos con el boton
    const dayButton = wrapper.find('[data-testid="AboutButton"]')
    expect(dayButton.exists()).toBe(true)

    expect(dayButton.text()).toBe('About')
    await dayButton.trigger('click')

    expect(router.push).toHaveBeenCalledWith({ name: 'about' })
  })
})
