describe('WeatherNow Uygulaması', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Geçerli şehir için hava durumu bilgilerini kontrol etme', () => {

    cy.get('.css-6j8wv5-Input').should('exist')
    cy.log('Input field exists');
    cy.get('.css-6j8wv5-Input').type('London');
    cy.wait(2000)
    cy.log('Typed "London" into input field');

    cy.get('#react-select-3-option-0').click();
    cy.log('Selected city from dropdown');

    cy.contains('London').should('be.visible');
    cy.get('.temperature')
    cy.contains('mist').should('be.visible');
    cy.contains('18°C').should('be.visible');
  });

  it('Geçerli şehir için API\'den hava durumu verisi alma', () => {

    cy.intercept('GET', '**/weather*').as('getWeather');
    
    cy.intercept('GET', '**/forecast*').as('getForecast');

    cy.get('.css-6j8wv5-Input').should('exist')
    cy.log('Input field exists');
    cy.get('.css-6j8wv5-Input').type('London');
    cy.log('Typed "London" into input field');
    cy.wait(2000)
    cy.get('#react-select-3-option-2').click();
    cy.log('Selected city from dropdown');

    // API çağrısının tetiklenip tetiklenmediğini kontrol et
    cy.wait('@getWeather', { timeout: 2000 }).then((interception) => {
      cy.log('Weather API call made');
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.wait('@getForecast', { timeout: 2000 }).then((interception) => {
      cy.log('Forecast API call made');
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});