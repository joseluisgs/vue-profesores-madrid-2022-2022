// est chorra para la wikipedia
describe('Wikipedia Tests', () => {
  it('debería abrir la página Wikipedia', () => {
    cy.visit('https://es.wikipedia.org/')
    cy.contains('h1', 'Wikipedia')
  })

  it('debería buscar la palabra "jugabilidad" y su autor ser José Luis González', () => {
    cy.visit('https://es.wikipedia.org/')
    cy.contains('h1', 'Wikipedia')
    cy.get('#searchInput').type('jugabilidad')
    cy.get('#searchButton').click()
    cy.contains('h1', 'Jugabilidad')
    cy.contains('González Sánchez')
  })
})

describe('JoseluisGS Tests', () => {
  it('debería abrir la página web joseluisgs.github.io', () => {
    cy.visit('https://joseluisgs.github.io/')
    cy.contains('h1', 'José Luis González')
  })

  it('debería navegar a docencia desde el menú', () => {
    cy.visit('https://joseluisgs.github.io/')
    // navegamos a docencia
    cy.get('nav').contains('Docencia').click({ force: true })
    cy.contains('h1', 'Actividad Docente')
    cy.contains('IES Luis Vives')
    // Existe el enlace a IES Luis Vives
    cy.contains('IES Luis Vives').should('have.attr', 'href', 'http://iesluisvives.es/')
    // mis módulos de docencia
    cy.contains('li', 'Programación')
    cy.contains('li', 'Entornos de Desarrollo')
    cy.contains('li', 'Programación de Servicios y Procesos')
    cy.contains('li', 'Acceso a Datos')
  })
})
