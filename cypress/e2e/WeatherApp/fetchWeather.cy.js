describe('WeatherNow Uygulaması', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/weather*', {
      fixture: 'weather.json'
    }).as('getWeather');

    cy.intercept('GET', '**/forecast*', {
      fixture: 'forecast.json'
    }).as('getForecast');
  });

  it('Geçerli şehir için API\'den hava durumu verisi alma', () => {
    cy.visit('http://localhost:3000');

    cy.get('.css-6j8wv5-Input').should('exist').then(() => {
      cy.log('Input field exists');
      cy.get('.css-6j8wv5-Input').type('London');
      cy.log('Typed "London" into input field');

      cy.get('#react-select-3-option-0').click();
      cy.log('Selected city from dropdown');

      // API çağrısının tetiklenip tetiklenmediğini kontrol et
      cy.wait('@getWeather', { timeout: 10000 }).then((interception) => {
        cy.log('Weather API call made');
        expect(interception.response.statusCode).to.eq(200);
      });

      cy.wait('@getForecast', { timeout: 10000 }).then((interception) => {
        cy.log('Forecast API call made');
        expect(interception.response.statusCode).to.eq(200);
      });

      cy.contains('London').should('be.visible');
      cy.contains('Partly cloudy').should('be.visible');
      cy.contains('20°C').should('be.visible');
    });
  });
});
