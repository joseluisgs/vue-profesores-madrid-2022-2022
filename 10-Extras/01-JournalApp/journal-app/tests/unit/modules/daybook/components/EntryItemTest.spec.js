import { beforeEach, describe, expect, test } from 'vitest'

import EntryItem from '@/modules/daybook/components/EntryItem.vue'

import { shallowMount } from '@vue/test-utils'

// Suite de Test
describe('Daybook Componente -> EntryItem', () => {
  let wrapper

  const entry = {
    id: '1', // 123456789
    date: new Date().toDateString(), // Sun Dec 16 2019
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    picture: 'https://picsum.photos/600/600', // 'https://picsum.photos/200/300'
  }

  beforeEach(() => {
    wrapper = shallowMount(EntryItem, {
      props: {
        entry,
      },
    })
  })

  test('Debe hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  // Propiedades computadas
  test('Debe tener una propiedad "entry"', () => {
    expect(wrapper.props().entry).toStrictEqual(entry)
  })

  test('Debe tener un texto de como máximo 130 renderizado"', () => {
    const text = wrapper.find('[data-testid="entry-text"]')
    expect(text.text()).toBe(`${entry.text.substring(0, 130)}...`)
  })

  test('Debe renderizar bien la fecha"', () => {
    const entryDate = wrapper.vm.entryDate

    const entryDay = wrapper.find('[data-testid="entry-day"]')
    expect(entryDay.text()).toBe(String(entryDate.day))

    const entryMonth = wrapper.find('[data-testid="entry-month"]')
    expect(entryMonth.text()).toBe(entryDate.month)

    const entryYear = wrapper.find('[data-testid="entry-year"]')
    expect(entryYear.text()).toContain(entryDate.year)
  })
})
