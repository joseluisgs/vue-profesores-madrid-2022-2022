// Un test de ejemplo

import { describe, test, expect } from 'vitest'

// Suite de Test
describe('Hello Test Suite', () => {
  // Un test
  test('True is always true', () => {
    expect(true).toBe(true)
  })

  // Un test
  test('Hello World', () => {
    expect('Hello World').toBe('Hello World')
  })

  // Debe ser mayor a diez
  test('Number greater than 10', () => {
    const number = 11
    expect(number).toBeGreaterThan(10)
  })
})
