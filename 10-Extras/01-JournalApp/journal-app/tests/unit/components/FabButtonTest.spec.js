import { beforeEach, describe, expect, test } from 'vitest'

import FabButton from '@/components/FabButton.vue'

import { shallowMount } from '@vue/test-utils'

// Suite de Test
describe('Component -> FabButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FabButton, {
      props: {
        icon: 'testing-icon',
      },
    })
  })

  test('Debe hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  // Testeamos propiedades
  test('Debe mostrar las propiedades del boton', () => {
    expect(wrapper.html()).toContain('testing-icon')
  })

  // Testeamos el evento
  test('Debe emitir ele vento onClick al hacer click', () => {
    const button = wrapper.find('button')
    // pulsamos el evento click
    button.trigger('click')
    // vemos si emitimos el evento onClick
    expect(wrapper.emitted('onClick')).toHaveLength(1)
  })
})
