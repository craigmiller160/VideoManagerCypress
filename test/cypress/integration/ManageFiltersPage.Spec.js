const { HOST_URL } = require('../../util/envConstants');
const { users: { standard, edit }, password } = require('../../util/users');
const { MANAGE_FILTERS_LINK } = require('../selectors/navbar');
const {
    MANAGE_FILTERS_TITLE,
    CATEGORY_FILTERS,
    CATEGORY_FILTERS_TITLE,
    CATEGORY_FILTERS_LIST,
    CATEGORY_FILTERS_ADD_BTN,
    SERIES_FILTERS,
    SERIES_FILTERS_TITLE,
    SERIES_FILTERS_LIST,
    SERIES_FILTERS_ADD_BTN,
    STAR_FILTERS,
    STAR_FILTERS_TITLE,
    STAR_FILTERS_LIST,
    STAR_FILTERS_ADD_BTN,
    CATEGORY_FILTER_ITEMS,
    SERIES_FILTER_ITEMS,
    STAR_FILTER_ITEMS
} = require('../selectors/manageFilters');

describe('Manage Filters Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
    });

    it('cannot access without edit role', () => {
        cy.login(standard.userName, password);
        cy.get(MANAGE_FILTERS_LINK)
            .should('not.exist');
    });

    describe('has access', () => {
        beforeEach(() => {
            cy.login(edit.userName, password);
            cy.get(MANAGE_FILTERS_LINK)
                .click();
        });

        it('page has expected elements', () => {
            cy.get(MANAGE_FILTERS_TITLE)
                .should('have.text', 'Manage Filters');

            // Categories
            cy.get(CATEGORY_FILTERS)
                .should('exist');
            cy.get(CATEGORY_FILTERS_TITLE)
                .should('have.text', 'Categories');
            cy.get(CATEGORY_FILTERS_LIST)
                .should('exist');
            cy.get(CATEGORY_FILTERS_ADD_BTN)
                .should('have.text', '+');

            // Series
            cy.get(SERIES_FILTERS)
                .should('exist');
            cy.get(SERIES_FILTERS_TITLE)
                .should('have.text', 'Series');
            cy.get(SERIES_FILTERS_LIST)
                .should('exist');
            cy.get(SERIES_FILTERS_ADD_BTN)
                .should('have.text', '+');

            // Stars
            cy.get(STAR_FILTERS)
                .should('exist');
            cy.get(STAR_FILTERS_TITLE)
                .should('have.text', 'Stars');
            cy.get(STAR_FILTERS_LIST)
                .should('exist');
            cy.get(STAR_FILTERS_ADD_BTN)
                .should('have.text', '+');
        });

        it('add new category', () => {
            const newValue = 'New Value';
            cy.get(CATEGORY_FILTER_ITEMS)
                .should('have.length', 0);
            cy.get(CATEGORY_FILTERS_ADD_BTN)
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

            cy.get(CATEGORY_FILTER_ITEMS)
                .should('have.length', 1);
            cy.get(CATEGORY_FILTER_ITEMS)
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