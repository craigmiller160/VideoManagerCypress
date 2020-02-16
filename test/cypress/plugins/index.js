const initDb = require('./initDb');

module.exports = (on, config) => {
    on('task', {
        initDb
    });
};