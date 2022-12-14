/* eslint-disable no-undef */
// import { myUrl } from '../utilities'

describe('DayBook Actions', () => {
  beforeEach(() => {
    cy.visit('/daybook') // "baseUrl" definido en cypress.jsonw
  })

  it('Carga la Página', () => {
    cy.contains('DayBook')
    const button = cy.get('[data-testid="navbar-button-home"]')
    button.should('be.visible')
    button.contains('DayBook')
  })

  it('Vuelve a principal', () => {
    cy.contains('DayBook')
    const button = cy.get('[data-testid="navbar-button-home"]')
    button.should('be.visible')
    button.contains('DayBook')
    button.click()
    cy.contains('DayBook')
    cy.contains('This is an home page')
  })

  it('Hace Logout', () => {
    cy.contains('DayBook')
    const buttonLogOut = cy.get('[data-testid="navbar-button-logout"]')
    buttonLogOut.should('be.visible')
    buttonLogOut.click()
    const message = cy.get('span')
    message.should('be.visible')
    message.contains('ERROR')
  })

  it('Hace LogIn en NavBar', () => {
    cy.contains('DayBook')
    const buttonLogOut = cy.get('[data-testid="navbar-button-logout"]')
    buttonLogOut.should('be.visible')
    buttonLogOut.click()
    const buttonLogIn = cy.get('[data-testid="navbar-button-login"]')
    buttonLogIn.should('be.visible')
    buttonLogIn.click()
    cy.contains('No hay nada seleccionado')
  })

  it('Hace LogIn en mensaje de error', () => {
    cy.contains('DayBook')
    const buttonLogOut = cy.get('[data-testid="navbar-button-logout"]')
    buttonLogOut.should('be.visible')
    buttonLogOut.click()
    const message = cy.get('span')
    message.should('be.visible')
    message.contains('ERROR')
    const button = cy.get('.flex-none > .btn')
    button.should('be.visible')
    button.click()
    cy.contains('No hay nada seleccionado')
  })
})
