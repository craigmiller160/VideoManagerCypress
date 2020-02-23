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
            cy.get('#manageFiltersLink_navLink')
                .click();
        });

        it('page has expected elements', () => {
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
            const newValue = 'New Value';
            cy.get('#category-filters-list p')
                .should('have.length', 0);
            cy.get('#category-filters-add-btn')
                .click();
            cy.get('#category-filter-input-modal')
                .parent()
                .invoke('attr', 'class')
                .should('contain', 'show');

            cy.get('#category-filter-input-modal h5.modal-title')
                .should('have.text', 'Add Category');
            cy.get('label[for="filter-name-input"]')
                .should('have.text', 'Category Name');
            cy.get('#filter-name-input')
                .type(newValue);

            cy.get('#filter-cancel-btn')
                .should('exist');
            cy.get('#filter-delete-btn')
                .should('not.exist');
            cy.get('#filter-save-btn')
                .click();

            cy.get('#category-filters-list p')
                .should('have.length', 1);
            cy.get('#category-filters-list p')
                .should('have.text', newValue);
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