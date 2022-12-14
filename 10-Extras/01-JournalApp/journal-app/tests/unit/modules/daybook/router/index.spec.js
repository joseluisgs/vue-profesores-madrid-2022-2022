import { describe, expect, test } from 'vitest'

import daybookRouter from '@/modules/daybook/router'

describe('Router -> Daybook Router', () => {
  test('El router debe tener esta configuración', () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      meta: { title: 'DayBook' },
      component: expect.any(Function),
      children: [
        {
          name: 'daybook-no-entry',
          path: '',
          meta: { title: 'DayBook No Entry' },
          component: expect.any(Function),
        },
        {
          name: 'daybook-entry',
          path: ':id',
          meta: { title: 'DayBook Entry' },
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    })
  })

  test('El router debe retornar el id de la ruta', () => {
    const route = {
      params: { id: 'TEST' },
    }

    const entryRoute = daybookRouter.children.find((route) => route.name === 'daybook-entry')

    expect(entryRoute.props(route)).toEqual({ id: 'TEST' })
  })
})
