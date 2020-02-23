const { SET_ROOT_DIR, INSERT_VIDEO_FILES } = require('../../../db/queryKeys');
const { HOST_URL } = require('../../../util/envConstants');
const { users: { standard, scan }, password } = require('../../../util/users');
const { getSampleFilesDirVideos } = require('../../../file/paths');

describe('Scan Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env(HOST_URL));
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

    describe('has access', () => {
        beforeEach(() => {
            cy.login(scan.userName, password);
        });

        it('cannot scan without root dir', () => {
            cy.get('#scanDirectoryLink_text')
                .click();
            cy.get('#alert-box')
                .invoke('attr', 'class')
                .should('contain', 'danger')
                .should('contain', 'show');
            cy.get('#alert-box')
                .should('include.text', 'No root directory is set');
        });

        it('runs scan and loads files', () => {
            cy.task('executeQuery', {
                key: SET_ROOT_DIR
            });
            cy.get('#scanDirectoryLink_text')
                .click();
            cy.wait(1000);
            cy.get('#videoListLink_navLink')
                .click();
            cy.get('#video-list-contents-wrapper')
                .should('exist');
            cy.get('#video-list-contents .list-group-item')
                .should('have.length', 10);
        });

        it('runs scan and removes files that are not present', () => {
            const fileName = 'dummy-file.mp4';
            cy.task('executeQuery', {
                key: INSERT_VIDEO_FILES,
                files: [
                    { fileName }
                ]
            });
            cy.task('executeQuery', {
                key: SET_ROOT_DIR
            });
            cy.get('#scanDirectoryLink_text')
                .click();
            cy.wait(1000);
            cy.get('#videoListLink_navLink')
                .click();
            cy.get('#video-list-contents-wrapper')
                .should('exist');
            cy.get('#video-list-contents .list-group-item')
                .should('have.length', 10);
            cy.get('#video-list-contents .list-group-item .list-group-item-heading')
                .should('not.have.text', fileName);

        });
    });
});
