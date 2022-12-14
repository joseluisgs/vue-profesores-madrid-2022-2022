import { describe, expect, test } from 'vitest'

import AboutView from '@/views/AboutView.vue'
import { shallowMount } from '@vue/test-utils'

describe('View -> AboutView', () => {
  test('Debe hacer match con el snapshot', () => {
    const wrapper = shallowMount(AboutView)
    expect(wrapper.html()).toMatchSnapshot() // snapshot es una imagen de la vista y podemos usar .element tambien o html()
  })
})
