const { HOST_URL } = require('../../util/envConstants');
const { users: { standard, edit }, password } = require('../../util/users');

describe('Manage Filters Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
    });

    it('cannot access without edit role', () => {
        cy.login(standard.userName, password);
        cy.get('#manageFiltersLink_navLink')
            .should('not.exist');
    });

    describe('has access', () => {
        beforeEach(() => {
            cy.login(edit.userName, password);
        });

        it('page has expected elements', () => {
            cy.get('#manageFiltersLink_navLink')
                .click();
            cy.get('#manage-filters-title')
                .should('have.text', 'Manage Filters');

            // Categories
            cy.get('#category-filters')
                .should('exist');
            cy.get('#category-filters-title')
                .should('have.text', 'Categories');
            cy.get('#category-filters-list')
                .should('exist');
            cy.get('#category-filters-add-btn')
                .should('have.text', '+');

            // Series
            cy.get('#series-filters')
                .should('exist');
            cy.get('#series-filters-title')
                .should('have.text', 'Series');
            cy.get('#series-filters-list')
                .should('exist');
            cy.get('#series-filters-add-btn')
                .should('have.text', '+');

            // Stars
            cy.get('#star-filters')
                .should('exist');
            cy.get('#star-filters-title')
                .should('have.text', 'Stars');
            cy.get('#star-filters-list')
                .should('exist');
            cy.get('#star-filters-add-btn')
                .should('have.text', '+');
        });

        it('add new category', () => {
            throw new Error();
        });

        it('edit existing category', () => {
            throw new Error();
        });

        it('delete category', () => {
            throw new Error();
        });

        it('add new series', () => {
            throw new Error();
        });

        it('edit existing series', () => {
            throw new Error();
        });

        it('delete series', () => {
            throw new Error();
        });

        it('add new star', () => {
            throw new Error();
        });

        it('edit existing star', () => {
            throw new Error();
        });

        it('delete star', () => {
            throw new Error();
        });
    });
});