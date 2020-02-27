const { HOST_URL } = require('../../../util/envConstants');
const { users: { admin, edit, scan, standard, all }, password } = require('../../../util/users');
const {
    SCAN_DIR_LINK,
    VIDEO_LIST_LINK,
    HOME_LINK,
    USER_MANAGEMENT_LINK,
    MANAGE_FILTERS_LINK,
    SETTINGS_LINK,
    PROFILE_TOGGLE_BTN,
    USER_PROFILE_LINK,
    LOGOUT_LINK
} = require('../../selectors/navbar');
const { LOGIN_TITLE } = require('../../selectors/login');

const testNavbar = ({
    videos = false,
    users = false,
    settings = false,
    scan = false,
    filters = false,
    profile = false,
    userName
} = {}) => {
    cy.get(HOME_LINK)
        .should('have.attr', 'href', '/')
        .should('have.text', 'Video Manager');

    const videosLink = cy.get(VIDEO_LIST_LINK);
    if (videos) {
        videosLink.should('have.attr', 'href', '/videos')
            .should('have.text', 'Videos');
    } else {
        videosLink.should('not.exist');
    }

    const usersLink = cy.get(USER_MANAGEMENT_LINK);
    if (users) {
        usersLink.should('have.attr', 'href', '/users')
            .should('have.text', 'Users');
    } else {
        usersLink.should('not.exist');
    }

    const filtersLink = cy.get(MANAGE_FILTERS_LINK);
    if (filters) {
        filtersLink.should('have.attr', 'href', '/filters')
            .should('have.text', 'Filters');
    } else {
        filtersLink.should('not.exist');
    }

    const scanLink = cy.get(SCAN_DIR_LINK);
    if (scan) {
        scanLink.should('have.text', 'Scan');
    } else {
        scanLink.should('not.exist');
    }

    const settingsLink = cy.get(SETTINGS_LINK);
    if (settings) {
        settingsLink.should('have.attr', 'href', '/settings')
            .should('have.text', 'Settings');
    } else {
        settingsLink.should('not.exist');
    }

    const profileToggle = cy.get(PROFILE_TOGGLE_BTN);
    if (profile) {
        profileToggle.should('have.attr', 'href', '#')
            .should('have.attr', 'aria-expanded', 'false')
            .should('have.text', userName);

        cy.get(USER_PROFILE_LINK).should('not.be.visible');
        cy.get(LOGOUT_LINK).should('not.be.visible');

        cy.get(PROFILE_TOGGLE_BTN).click()
            .should('have.attr', 'aria-expanded', 'true');

        cy.get(USER_PROFILE_LINK)
            .should('have.attr', 'href', '/profile')
            .should('have.text', 'Profile');
        cy.get(LOGOUT_LINK)
            .should('have.text', 'Logout');
    } else {
        profileToggle.should('not.exist');
    }
};

describe('Navbar appearance and actions by user role', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
    });

    it('is on login page', () => {
        testNavbar();
    });

    it('user has admin role', () => {
        cy.login(admin.userName, password);

        testNavbar({
            videos: true,
            users: true,
            settings: true,
            profile: true,
            userName: `${admin.firstName} ${admin.lastName}`
        });
    });

    it('user has edit role', () => {
        cy.login(edit.userName, password);

        testNavbar({
            videos: true,
            filters: true,
            profile: true,
            userName: `${edit.firstName} ${edit.lastName}`
        });
    });

    it('user has scan role', () => {
        cy.login(scan.userName, password);

        testNavbar({
            videos: true,
            scan: true,
            profile: true,
            userName: `${scan.firstName} ${scan.lastName}`
        });
    });

    it('user has no roles', () => {
        cy.login(standard.userName, password);

        testNavbar({
            videos: true,
            profile: true,
            userName: `${standard.firstName} ${standard.lastName}`
        });
    });

    it('user has all roles', () => {
        cy.login(all.userName, password);

        testNavbar({
            videos: true,
            profile: true,
            filters: true,
            users: true,
            settings: true,
            scan: true,
            userName: `${all.firstName} ${all.lastName}`
        });
    });

    it('user can logout', () => {
        cy.login(all.userName, password);

        cy.get(PROFILE_TOGGLE_BTN)
            .click();
        cy.get(LOGOUT_LINK)
            .click();
        cy.get(LOGIN_TITLE)
            .should('have.text', 'Login');
    });
});