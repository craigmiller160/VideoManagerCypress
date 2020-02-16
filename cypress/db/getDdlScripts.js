const fs = require('fs');
const { PG_CREATE_SCRIPT_PATH, PG_DROP_SCRIPT_PATH } = require('../util/envConstants');

const getDdlScripts = async (env) => {
    const createScript = fs.readFileSync(env[PG_CREATE_SCRIPT_PATH], 'utf8');
    const dropScript = fs.readFileSync(env[PG_DROP_SCRIPT_PATH], 'utf8');

    return {
        createScript: '',
        dropScript: ''
    }
};

module.exports = getDdlScripts;