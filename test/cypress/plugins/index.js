const initDb = require('./db/initDb');
const closeDb = require('./db/closeDb');
const initFiles = require('./file/initFiles');
const cleanFiles = require('./file/cleanFiles');

module.exports = (on, config) => {
    on('task', {
        initDb,
        closeDb,
        initFiles,
        cleanFiles
    });
};