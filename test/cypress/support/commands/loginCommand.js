Cypress.Commands.add('login', (userName, password) => {
    cy.get('#username-field-input')
        .type(userName);
    cy.get('#password-field-input')
        .type(password);
    cy.get('#login-btn').click();
});