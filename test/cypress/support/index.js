before(() => {
    cy.task('initDb', { env: Cypress.env() });
});