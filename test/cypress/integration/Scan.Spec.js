const { CLEAR_VIDEO_DATA } = require('../../db/queryKeys');

describe('Scan Page', () => {
    afterEach(() => {
        cy.task('executeQuery', { key: CLEAR_VIDEO_DATA });
    });

    it('cannot scan without scan role', () => {
        throw new Error();
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