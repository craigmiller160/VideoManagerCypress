require('./commands');
const { CLEAR_ALL_DATA } = require('../../db/queryKeys');

before(() => {
    cy.task('initConfig', { env: Cypress.env() });
    cy.task('initDb', { env: Cypress.env() });
    cy.task('initFiles');
});

beforeEach(() => {
    cy.task('executeQuery', { key: CLEAR_ALL_DATA });
});

after(() => {
    cy.task('closeDb');
    cy.task('cleanFiles');
});