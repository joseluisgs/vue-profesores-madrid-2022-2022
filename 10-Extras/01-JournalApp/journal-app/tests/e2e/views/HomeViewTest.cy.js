/* eslint-disable no-undef */
// import { myUrl } from '../utilities'

describe('HomePage App', () => {
  beforeEach(() => {
    cy.visit('/') // "baseUrl" definido en cypress.json
  })

  it('Carga la Página', () => {
    cy.contains('DayBook')
    cy.contains('About')
    cy.contains('This is an home page')
    // Vamos a seleccionar el boton
    const button = cy.get('[data-testid="DayButton"]')
    button.should('be.visible')
    button.contains('DayBook')
    // Pulsamos un click
    button.click()
    // Ahora debería haber un navbar
  })

  it('Navega a DayBook', () => {
    const button = cy.get('[data-testid="DayButton"]')
    button.should('be.visible')
    button.contains('DayBook')
    // Pulsamos un click
    button.click()
    // Ahora debería haber un navbar
    const navbar = cy.get('.navbar')
    navbar.should('be.visible')
  })
})
