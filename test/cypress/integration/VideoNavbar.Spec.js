const { HOST_URL } = require('../../util/envConstants');
const { users: { admin, edit, scan, standard, all }, password } = require('../../util/users');

const testNavbar = ({
    videos = false,
    users = false,
    settings = false,
    scan = false,
    filters = false,
    profile = false,
    userName
} = {}) => {
    cy.get('#home-link')
        .should('have.attr', 'href', '/')
        .should('have.text', 'Video Manager');

    const videosLink = cy.get('#videoListLink_navLink');
    if (videos) {
        videosLink.should('have.attr', 'href', '/videos')
            .should('have.text', 'Videos');
    } else {
        videosLink.should('not.exist');
    }

    const usersLink = cy.get('#userManagementLink_navLink');
    if (users) {
        usersLink.should('have.attr', 'href', '/users')
            .should('have.text', 'Users');
    } else {
        usersLink.should('not.exist');
    }

    const filtersLink = cy.get('#manageFiltersLink_navLink');
    if (filters) {
        filtersLink.should('have.attr', 'href', '/filters')
            .should('have.text', 'Filters');
    } else {
        filtersLink.should('not.exist');
    }

    const scanLink = cy.get('#scanDirectoryLink_text');
    if (scan) {
        scanLink.should('have.text', 'Scan');
    } else {
        scanLink.should('not.exist');
    }

    const settingsLink = cy.get('#settingsLink_navLink');
    if (settings) {
        settingsLink.should('have.attr', 'href', '/settings')
            .should('have.text', 'Settings');
    } else {
        settingsLink.should('not.exist');
    }

    const profileToggle = cy.get('#vm-navbar-dropdown-toggle');
    if (profile) {
        profileToggle.should('have.attr', 'href', '#')
            .should('have.attr', 'aria-expanded', 'false')
            .should('have.text', userName);
    } else {
        profileToggle.should('not.exist');
    }
};

describe('Navbar appearance and actions by user role', () => {
    it('is on login page', () => {
        cy.visit(Cypress.env(HOST_URL));
        testNavbar();
    });

    it('user has admin role', () => {
        cy.visit(Cypress.env(HOST_URL));
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
        cy.visit(Cypress.env(HOST_URL));
        cy.login(edit.userName, password);

        testNavbar({
            videos: true,
            filters: true,
            profile: true,
            userName: `${edit.firstName} ${edit.lastName}`
        });
    });

    it('user has scan role', () => {
        cy.visit(Cypress.env(HOST_URL));
        cy.login(scan.userName, password);

        testNavbar({
            videos: true,
            scan: true,
            profile: true,
            userName: `${scan.firstName} ${scan.lastName}`
        });
    });

    it('user has no roles', () => {
        cy.visit(Cypress.env(HOST_URL));
        cy.login(standard.userName, password);

        testNavbar({
            videos: true,
            profile: true,
            userName: `${standard.firstName} ${standard.lastName}`
        });
    });

    it('user has all roles', () => {
        cy.visit(Cypress.env(HOST_URL));
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
        throw new Error();
    });
});