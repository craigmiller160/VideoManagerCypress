const { CLEAR_VIDEO_DATA } = require('../../db/queryKeys');

describe('Scan Page', () => {
    afterEach(() => {
        cy.task('executeQuery', CLEAR_VIDEO_DATA);
    });

    it('cannot scan without scan role', () => {
        throw new Error();
    });

    it('runs scan and loads files', () => {
        // TODO somehow need to add a new file here
        throw new Error();
    });
});