before(() => {
    cy.task('initDb', { env: Cypress.env() });
});

after(() => {
    cy.task('closeDb');
});