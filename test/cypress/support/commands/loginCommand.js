const {
    USERNAME_FIELD,
    PASSWORD_FIELD,
    LOGIN_BTN
} = require('../../selectors/login');

Cypress.Commands.add('login', (userName, password) => {
    cy.get(USERNAME_FIELD)
        .type(userName);
    cy.get(PASSWORD_FIELD)
        .type(password);
    cy.get(LOGIN_BTN).click();
});