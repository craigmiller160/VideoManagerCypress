const { Client } = require('pg');
const { PG_DB } = require('../util/envConstants');
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASS } = require('../config');

const getClient = (env, config) => new Client({
    user: config[POSTGRES_USER],
    password: config[POSTGRES_PASS],
    host: config[POSTGRES_HOST],
    database: env[PG_DB],
    port: config[POSTGRES_PORT]
});

module.exports = getClient;