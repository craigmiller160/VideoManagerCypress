const { Client } = require('pg');
const { PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } = require('../util/envConstants');

const getClient = (env) => new Client({
    user: env[PG_USERNAME],
    password: env[PG_PASSWORD],
    host: env[PG_HOST],
    database: env[PG_DB],
    port: env[PG_PORT]
});

module.exports = getClient;