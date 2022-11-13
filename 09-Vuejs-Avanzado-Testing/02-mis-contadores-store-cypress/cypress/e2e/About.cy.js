// https://docs.cypress.io/api/introduction/api.html

describe('About Tests', () => {
  // Ahora podríamos repetir algunos test de modal si los queremos aquí
  const modalBodySelector = '[data-cy="modal-body"]'
  const openButtonSelector = '[data-cy="open-button"]'
  const closeButtonSelector = '[data-cy="close-modal"]'

  it('debería abrir y cerrar correctamente Modal', () => {
    // Montamos el componente
    cy.visit('/about')
    cy.contains('h1', 'About')
    // Al principio no es visible
    cy.get(modalBodySelector).should('not.be.visible')
    // Seleccionamos el botón y debe tener el texto "Abrir modal", le hacemos click
    cy.get(openButtonSelector).should('have.text', ' Abrir modal ').click()
    // Ahora sí debe estar visible
    cy.get(modalBodySelector).should('be.visible')
    // Cerramos el modal
    cy.get(closeButtonSelector).click()
    cy.get(modalBodySelector).should('not.be.visible')
  })
})
