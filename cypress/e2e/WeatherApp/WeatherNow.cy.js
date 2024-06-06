describe('WeatherNow Uygulaması', () => {
  it('Uygulama yüklenir ve başlık görüntülenir', () => {
    cy.visit('http://localhost:3000'); // Uygulamayı başlat
    cy.title().should('eq', 'WeatherNow'); // Başlık etiketini kontrol et
  });
});