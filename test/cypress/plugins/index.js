const initDb = require('./initDb');
const closeDb = require('./closeDb');

module.exports = (on, config) => {
    on('task', {
        initDb,
        closeDb
    });
};