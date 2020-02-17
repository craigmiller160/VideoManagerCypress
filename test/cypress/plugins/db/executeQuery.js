const PG = require('../../../db');

const executeQuery = async (key) => {
    await PG.executeQuery(key);
    return null;
};