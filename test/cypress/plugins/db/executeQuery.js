const PG = require('../../../db');

const executeQuery = async ({ key, ...args }) => {
    await PG.executeQuery(key, args);
    return null;
};

module.exports = executeQuery;