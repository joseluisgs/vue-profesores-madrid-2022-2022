// Vamos a probar el router
describe('Router Tests', () => {
  it('debería abrir la página Home al iniciar', () => {
    cy.visit('/')
    cy.contains('h1', 'Home')
    // Navega a la página About
  })

  it('debería abrir la página about', () => {
    cy.visit('/about')
    cy.contains('h1', 'About')
  })

  it('debería abrir la página 404', () => {
    cy.visit('/no-existe')
    cy.contains('h1', '404')
  })

  it('debería navegar correctamente', () => {
    cy.visit('/')
    cy.contains('h1', 'Home')
    // Navega a la página About
    cy.get('[data-cy="navbar-about"]').click()
    cy.contains('h1', 'About')
    cy.get('[data-cy="navbar-home"]').click()
    cy.contains('h1', 'Home')
  })
})
