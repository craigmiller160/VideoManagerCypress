const { CLEAR_ALL_DATA } = require('../../db/queryKeys');
const { HOST_URL } = require('../../util/envConstants');
const { users: { standard, scan }, password } = require('../../util/users');

describe('Scan Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
        Cypress.Cookies.debug(true);
    });

    afterEach(() => {
        cy.task('executeQuery', { key: CLEAR_ALL_DATA });
    });

    it('cannot scan without scan role', () => {
        cy.login(standard.userName, password);
        cy.get('#scanDirectoryLink_text')
            .should('not.exist');
        cy.visit(`${Cypress.env(HOST_URL)}/scanning`);
        cy.wait(1000);
        cy.url()
            .should('not.include', 'scanning')
            .should('not.include', 'login');
    });

    it('cannot scan without root dir', () => {
        throw new Error();
    });

    it('runs scan and loads files', () => {
        throw new Error();
    });

    it('runs scan and removes files that are not present', () => {
    	throw new Error();
    });
});
