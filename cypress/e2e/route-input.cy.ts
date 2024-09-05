describe('Route planning', () => {

  // Visit the route-input page before each test
  beforeEach(() => {
    cy.visit('http://localhost:4200/route-input');
  });

  it('should plan a route from Bern to Zürich', () => {

    // Ensure the input fields are present and can be typed into
    cy.get('input[name="start"]')
      .should('be.visible') // Ensure the input is visible
      .type('Bern')         // Type 'Bern' into the start input
      .should('have.value', 'Bern'); // Verify the input value is correctly set

    // Simulate pressing the enter key after typing into the start input
    cy.get('input[name="start"]').type('{enter}');


    // Enter value into the 'end' input field and wait for Cypress to process it
    cy.get('input[name="end"]')
      .type('Zürich') // Simulate typing into the input
      .then(($input) => {
        // Wait until the input field reflects the entered value
        cy.wrap($input).should('have.value', 'Zürich');
      })
      .type('{enter}') // Simulate pressing the enter key after typing
      .then(() => {
        // After pressing enter, wait for the next step
        cy.wait(1000); // Add a wait time to ensure the page processes the input
      });

    // Ensure the button to calculate the route is visible and click it
    cy.get('button[name="plan-route"]')
      .should('be.visible') // Ensure the button is visible
      .then(($btn) => {
        cy.wrap($btn).click(); // Click the button to calculate the route
      });

  });
});
