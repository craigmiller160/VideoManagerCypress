const { users: { admin }, password } = require('../../util/users');

describe('Navbar appearance and actions by user role', () => {
    it('user has admin role', () => {
        cy.login(admin.userName, password);
        cy.visit('https://localhost:3000');
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