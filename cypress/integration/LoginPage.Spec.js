import { HOST_URL } from '../util/envConstants';

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
    });

    it('shows required validation warning for both input fields', () => {
        throw new Error();
    });

    it('shows email validation warning for username field', () => {
        throw new Error();
    });

    it('logs into app', () => {
        throw new Error();
    });

    it('rejects invalid credentials', () => {
        throw new Error();
    });
});