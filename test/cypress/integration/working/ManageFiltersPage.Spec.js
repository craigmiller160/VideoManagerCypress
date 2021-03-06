const { HOST_URL } = require('../../../util/envConstants');
const { users: { standard, edit }, password } = require('../../../util/users');
const { MANAGE_FILTERS_LINK } = require('../../selectors/navbar');
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
} = require('../../selectors/manageFilters');
const {
    FILTER_NAME_LABEL,
    FILTER_NAME_INPUT,
    FILTER_CANCEL_BTN,
    FILTER_DELETE_BTN,
    FILTER_SAVE_BTN,
    CATEGORY_FILTER_MODAL,
    CATEGORY_FILTER_MODAL_TITLE,
    SERIES_FILTER_MODAL,
    SERIES_FILTER_MODAL_TITLE,
    STAR_FILTER_MODAL,
    STAR_FILTER_MODAL_TITLE
} = require('../../selectors/filterInputModal');
const toTitleCase = require('../../../util/lib/toTitleCase');
const { INSERT_VIDEO_FILES } = require('../../../db/queryKeys');

const CATEGORY_TYPE = 'category';
const SERIES_TYPE = 'series';
const STAR_TYPE = 'star';
const ADD_ACTION = 'add';
const EDIT_ACTION = 'edit';
const DELETE_ACTION = 'delete';

const startValue = 'Start Value';

const useFilterModal = ({
    action = '',
    type = '',
    value = ''
} = {}) => {
    const typeTitleCase = toTitleCase(type);
    let modalSelector;
    let modalTitleSelector;
    switch (type) {
        case CATEGORY_TYPE:
            modalSelector = CATEGORY_FILTER_MODAL;
            modalTitleSelector = CATEGORY_FILTER_MODAL_TITLE;
            break;
        case SERIES_TYPE:
            modalSelector = SERIES_FILTER_MODAL;
            modalTitleSelector = SERIES_FILTER_MODAL_TITLE;
            break;
        case STAR_TYPE:
            modalSelector = STAR_FILTER_MODAL;
            modalTitleSelector = STAR_FILTER_MODAL_TITLE;
            break;
        default:
            throw new Error(`Invalid type: ${type}`);
    }

    let actionLabel;
    switch (action) {
        case ADD_ACTION:
            actionLabel = 'Add';
            break;
        case EDIT_ACTION:
        case DELETE_ACTION:
            actionLabel = 'Edit';
            break;
        default:
            throw new Error(`Invalid action: ${action}`);
    }

    cy.get(modalSelector)
        .parent()
        .invoke('attr', 'class')
        .should('contain', 'show');

    cy.get(modalTitleSelector)
        .should('have.text', `${actionLabel} ${typeTitleCase}`);
    cy.get(FILTER_NAME_LABEL)
        .should('have.text', `${typeTitleCase} Name`);

    if (action !== DELETE_ACTION) {
        cy.get(FILTER_NAME_INPUT)
            .clear()
            .type(value);
    }

    cy.get(FILTER_CANCEL_BTN)
        .should('exist');

    if (action === ADD_ACTION) {
        cy.get(FILTER_DELETE_BTN)
            .should('not.exist');
    } else {
        cy.get(FILTER_DELETE_BTN)
            .should('exist');
    }

    if (action === DELETE_ACTION) {
        cy.get(FILTER_DELETE_BTN)
            .click();
    } else {
        cy.get(FILTER_SAVE_BTN)
            .click();
    }
};

const testItems = (selector, items) => {
    cy.get(selector)
        .should('have.length', items.length);
    items.forEach((item, index) => {
        cy.get(selector)
            .eq(index)
            .should('have.text', item);
    });
};

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
            cy.task('executeQuery', {
                key: INSERT_VIDEO_FILES,
                categories: [
                    { categoryName: startValue }
                ],
                series: [
                    { seriesName: startValue }
                ],
                stars: [
                    { starName: startValue }
                ]
            });
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
                .should('have.length', 1);
            cy.get(CATEGORY_FILTERS_ADD_BTN)
                .click();

            useFilterModal({
                type: CATEGORY_TYPE,
                value: newValue,
                action: ADD_ACTION
            });

            testItems(CATEGORY_FILTER_ITEMS, [newValue, startValue]);
        });

        it('edit existing category', () => {
            const newValue = 'New Value';
            cy.get(CATEGORY_FILTER_ITEMS)
                .eq(0)
                .click();

            useFilterModal({
                type: CATEGORY_TYPE,
                value: newValue,
                action: EDIT_ACTION
            });

            testItems(CATEGORY_FILTER_ITEMS, [newValue]);
        });

        it('delete category', () => {
            cy.get(CATEGORY_FILTER_ITEMS)
                .eq(0)
                .click();

            useFilterModal({
                type: CATEGORY_TYPE,
                action: DELETE_ACTION
            });

            testItems(CATEGORY_FILTER_ITEMS, []);
        });

        it('add new series', () => {
            const newValue = 'New Value';
            cy.get(SERIES_FILTER_ITEMS)
                .should('have.length', 0);
            cy.get(SERIES_FILTERS_ADD_BTN)
                .click();

            useFilterModal({
                type: SERIES_TYPE,
                value: newValue,
                action: ADD_ACTION
            });

            testItems(SERIES_FILTER_ITEMS, [newValue, startValue]);
        });

        it('edit existing series', () => {
            const newValue = 'New Value';
            cy.get(MANAGE_FILTERS_LINK)
                .click();
            cy.get(SERIES_FILTER_ITEMS)
                .eq(0)
                .click();

            useFilterModal({
                type: SERIES_TYPE,
                value: newValue,
                action: EDIT_ACTION
            });

            testItems(SERIES_FILTER_ITEMS, [newValue]);
        });

        it('delete series', () => {
            cy.get(SERIES_FILTER_ITEMS)
                .eq(0)
                .click();

            useFilterModal({
                type: SERIES_TYPE,
                action: DELETE_ACTION
            });

            testItems(SERIES_FILTER_ITEMS, []);
        });

        it('add new star', () => {
            const newValue = 'New Value';
            cy.get(STAR_FILTER_ITEMS)
                .should('have.length', 0);
            cy.get(STAR_FILTERS_ADD_BTN)
                .click();

            useFilterModal({
                type: STAR_TYPE,
                value: newValue,
                action: ADD_ACTION
            });

            testItems(STAR_FILTER_ITEMS, [newValue, startValue]);
        });

        it('edit existing star', () => {
            const newValue = 'New Value';
            cy.get(MANAGE_FILTERS_LINK)
                .click();
            cy.get(STAR_FILTER_ITEMS)
                .eq(0)
                .click();

            useFilterModal({
                type: STAR_TYPE,
                value: newValue,
                action: EDIT_ACTION
            });

            testItems(STAR_FILTER_ITEMS, [newValue]);
        });

        it('delete star', () => {
            cy.get(STAR_FILTER_ITEMS)
                .eq(0)
                .click();

            useFilterModal({
                type: STAR_TYPE,
                action: DELETE_ACTION
            });

            testItems(STAR_FILTER_ITEMS, []);
        });
    });
});
