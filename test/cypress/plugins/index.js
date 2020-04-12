const initDb = require('./db/initDb');
const closeDb = require('./db/closeDb');
const executeQuery = require('./db/executeQuery');
const initFiles = require('./file/initFiles');
const cleanFiles = require('./file/cleanFiles');
const initConfig = require('./config/initConfig');

module.exports = (on, config) => {
    on('task', {
        initDb,
        closeDb,
        executeQuery,
        initFiles,
        cleanFiles,
        initConfig
    });
};