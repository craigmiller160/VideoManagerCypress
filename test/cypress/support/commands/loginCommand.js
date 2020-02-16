Cypress.Commands.add('login', async (userName, password) => {
    const request = {
        userName,
        password
    };

    await cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: request
    });
});