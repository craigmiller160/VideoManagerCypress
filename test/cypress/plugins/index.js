const initDb = require('./db/initDb');
const closeDb = require('./db/closeDb');

module.exports = (on, config) => {
    on('task', {
        initDb,
        closeDb
    });
};