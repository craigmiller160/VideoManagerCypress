const PG = require('../../../db');

const closeDb = () => {
    PG.close();
    return null;
};

module.exports = closeDb;