const { Client } = require('pg');
const { PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } = require('../util/envConstants');

const getClient = () => new Client({
    user: Cypress.env(PG_USERNAME),
    password: Cypress.env(PG_PASSWORD),
    host: Cypress.env(PG_HOST),
    database: Cypress.env(PG_DB),
    port: Cypress.env(PG_PORT)
});

module.exports = getClient;