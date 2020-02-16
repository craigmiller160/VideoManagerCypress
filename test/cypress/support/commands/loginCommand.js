Cypress.Commands.add('login', (userName, password) => {
    const request = {
        userName,
        password
    };

    return cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: request
    });
});