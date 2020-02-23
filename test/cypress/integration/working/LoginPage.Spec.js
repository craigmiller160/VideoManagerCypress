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
const { ALERT_BOX } = require('../../selectors/alert');
const { HOME_TITLE } = require('../../selectors/home');

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
        cy.get(USERNAME_FIELD)
            .type('abc');
        cy.get('body')
            .click();
        cy.get(USERNAME_FIELD_ERROR)
            .should('have.text', 'Must be valid email');

        cy.get(LOGIN_BTN)
            .should('be.disabled');
    });

    it('logs into app', () => {
        cy.get(USERNAME_FIELD)
            .type(admin.userName);
        cy.get(PASSWORD_FIELD)
            .type(password);

        cy.get(LOGIN_BTN)
            .should('not.be.disabled')
            .click();

        cy.get(HOME_TITLE)
            .should('have.text', 'Welcome to VideoManager');
        cy.url()
            .should('not.include', '/login');
    });

    it('rejects invalid credentials', () => {
        cy.get(USERNAME_FIELD)
            .type('abc@gmail.com');
        cy.get(PASSWORD_FIELD)
            .type('abc');

        cy.get(LOGIN_BTN)
            .should('not.be.disabled')
            .click();

        cy.get(ALERT_BOX)
            .invoke('attr', 'class')
            .should('contain', 'danger')
            .should('contain', 'show');
    });
});
