/// <reference types="cypress" />

describe('Hava Durumu Bilgileri', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('displays weather information correctly', () => {
      if(cy.get('.container > :nth-child(2)').should('have.text', 'Error: Could not access your location. Please try searching for a city.')){
        console.log("we don't have your location")
      }else{
        console.log("we have your your location")
      }
      cy.get('.css-6j8wv5-Input input').type('Adana')
      cy.wait(2000);
      cy.get('#react-select-3-option-0').should('have.text', 'Adana, TR').click()
      cy.get('.temperature').should('have.text', '40°C')
      cy.get('.details > :nth-child(2)').should('contain.text', '43°C')
      cy.get('.details > :nth-child(4)').should('contain.text', '31%')
      cy.get('.accordion').should('be.visible')
      cy.get('.accordion > :nth-child(1)').should('be.visible')
      cy.get('.accordion > :nth-child(1) > .accordion__heading').click()
      cy.get('.accordion > :nth-child(1) > .accordion__heading > .accordion__button > .daily-item > .day').should('have.text', 'Friday')
      cy.get('.accordion > :nth-child(1) > .accordion__panel > .daily-details-grid > :nth-child(2)').should('have.text', 'Humidity:14')
      cy.get('.accordion > :nth-child(7)').should('be.visible')
      cy.get('.accordion > :nth-child(7) > .accordion__heading').click()
      cy.get('.accordion > :nth-child(7) > .accordion__heading > .accordion__button > .daily-item > .day').should('have.text', 'Thursday')
      cy.get('.accordion > :nth-child(7) > .accordion__panel > .daily-details-grid > :nth-child(4)').should('have.text', 'Wind speed:1.57 m/s')
    })
  })
  