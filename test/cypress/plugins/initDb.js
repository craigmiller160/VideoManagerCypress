const PG = require('../../db');

const initDb = async ({ env }) => {
    await PG.init(env);
    return null;
};

module.exports = initDb;