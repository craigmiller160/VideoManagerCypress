const { HOST_URL } = require('../../../util/envConstants');
const { users: { admin }, password } = require('../../../util/users');
const {
    LOGIN_TITLE,
    LOGIN_BTN,
    USERNAME_FIELD,
    USERNAME_FIELD_ERROR,
    PASSWORD_FIELD,
    PASSWORD_FIELD_ERROR
} = require('../../selectors/login');

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
        cy.get(LOGIN_TITLE)
            .should('have.text', 'Login');
        cy.url()
            .should('include', '/login');
        cy.get(LOGIN_BTN)
            .should('be.disabled');
    });

    it('shows required validation warning for both input fields', () => {
        cy.get(USERNAME_FIELD)
            .click();
        cy.get('body')
            .click();
        cy.get(USERNAME_FIELD_ERROR)
            .should('have.text', 'Required');

        cy.get(PASSWORD_FIELD)
            .click();
        cy.get('body')
            .click();
        cy.get(PASSWORD_FIELD_ERROR)
            .should('have.text', 'Required');

        cy.get(LOGIN_BTN)
            .should('be.disabled');
    });

    it('shows email validation warning for username field', () => {
        cy.get('#username-field-input')
            .type('abc');
        cy.get('body')
            .click();
        cy.get('#username-field > span.text-danger')
            .should('have.text', 'Must be valid email');

        cy.get('#login-btn')
            .should('be.disabled');
    });

    it('logs into app', () => {
        cy.get(USERNAME_FIELD)
            .type(admin.userName);
        cy.get(PASSWORD_FIELD)
            .type(password);

        cy.get(LOGIN_BTN)
            .should('not.be.disabled');
        cy.get(LOGIN_BTN).click();

        cy.get('#home-title')
            .should('have.text', 'Welcome to VideoManager');
        cy.url()
            .should('not.include', '/login');
    });

    it('rejects invalid credentials', () => {
        cy.get('#username-field-input')
            .type('abc@gmail.com');
        cy.get('#password-field-input')
            .type('abc');

        cy.get('#login-btn')
            .should('not.be.disabled');
        cy.get('#login-btn').click();

        cy.get('#alert-box')
            .invoke('attr', 'class')
            .should('contain', 'danger')
            .should('contain', 'show');
    });
});
