describe('Route planning', () => {
  it('should plan a route from Berlin to Munich', () => {
    cy.visit('http://localhost:4200/route-input');

    cy.get('input[name="start"]').type('Berlin');
    cy.get('input[name="end"]').type('Munich');

    cy.get('button[name="plan-route"]').click();

    cy.contains('Route erfolgreich geplant').should('be.visible');
  });
});