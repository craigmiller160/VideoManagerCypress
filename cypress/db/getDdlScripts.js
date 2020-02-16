const { PG_CREATE_SCRIPT_PATH, PG_DROP_SCRIPT_PATH } = require('../util/envConstants');

const getDdlScripts = async () => {
    const createScript = await cy.readFile(Cypress.env(PG_CREATE_SCRIPT_PATH));
    const dropScript = await cy.readFile(Cypress.env(PG_DROP_SCRIPT_PATH));
    return {
        createScript,
        dropScript
    }
};

module.exports = getDdlScripts;