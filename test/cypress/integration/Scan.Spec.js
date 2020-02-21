const { CLEAR_ALL_DATA } = require('../../db/queryKeys');
const { HOST_URL } = require('../../util/envConstants');
const { users: { standard, scan }, password } = require('../../util/users');

describe('Scan Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
    });

    afterEach(() => {
        cy.task('executeQuery', { key: CLEAR_ALL_DATA });
    });

    it('cannot scan without scan role', () => {
        cy.login(standard.userName, password);
        cy.get('#scanDirectoryLink_text')
            .should('not.exist');
        // Eventually figure out how to make a test for the URL endpoint work
        // cy.visit(`${Cypress.env(HOST_URL)}/scanning`);
        // cy.wait(1000);
        // cy.url()
        //     .should('not.include', 'scanning')
        //     .should('not.include', 'login');
    });

    it('cannot scan without root dir', () => {
        cy.login(scan.userName, password);
        cy.get('#scanDirectoryLink_text')
            .should('exist')
            .click();
        cy.get('#alert-box')
            .invoke('attr', 'class')
            .should('contain', 'danger')
            .should('contain', 'show');
        cy.get('#alert-box')
            .should('include.text', 'No root directory is set');
    });

    it('runs scan and loads files', () => {
        throw new Error();
    });

    it('runs scan and removes files that are not present', () => {
    	throw new Error();
    });
});
