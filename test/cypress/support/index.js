require('./commands');

before(() => {
    cy.task('initDb', { env: Cypress.env() });
    cy.task('initFiles');
});

after(() => {
    cy.task('closeDb');
    cy.task('cleanFiles');
});