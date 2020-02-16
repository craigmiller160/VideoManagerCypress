const { HOST_URL } = require('../../util/envConstants');
const { users: { admin }, password } = require('../../util/users');

describe('Navbar appearance and actions by user role', () => {
    it('user has admin role', () => {
        cy.visit(Cypress.env(HOST_URL));
        cy.login(admin.userName, password);
    });

    it('user has edit role', () => {
        throw new Error();
    });

    it('user has scan role', () => {
        throw new Error();
    });

    it('user has no roles', () => {
        throw new Error();
    });

    it('user can logout', () => {
        throw new Error();
    });
});