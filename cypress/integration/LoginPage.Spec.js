import { HOST_URL } from '../util/envConstants';

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
        cy.get('#login-title')
            .should('have.text', 'Login');
    });

    it('shows required validation warning for both input fields', () => {
        cy.get('#username-field-input')
            .click();
        cy.get('body')
            .click();
        cy.get('#username-field > span.text-danger')
            .should('have.text', 'Required');

        cy.get('#password-field-input')
            .click();
        cy.get('body')
            .click();
        cy.get('#password-field > span.text-danger')
            .should('have.text', 'Required');
    });

    it('shows email validation warning for username field', () => {
        cy.get('#username-field-input')
            .type('abc');
        cy.get('body')
            .click();
        cy.get('#username-field > span.text-danger')
            .should('have.text', 'Must be valid email');
    });

    it('logs into app', () => {
        throw new Error();
    });

    it('rejects invalid credentials', () => {
        throw new Error();
    });
});