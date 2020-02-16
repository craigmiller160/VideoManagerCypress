const fs = require('fs');
const { VM_SERVER_PATH } = require('../util/envConstants');

const getDdlScripts = async (env) => {
    const serverPath = env[VM_SERVER_PATH];
    const cwd = process.cwd();

    const createScript = fs.readFileSync(`${serverPath}/sql/create-schema.sql`, 'utf8');
    const dropScript = fs.readFileSync(`${serverPath}/sql/drop-schema.sql`, 'utf8');
    const rolesScript = fs.readFileSync(`${serverPath}/sql/roles.sql`, 'utf8');
    const usersScript = fs.readFileSync(`${cwd}/test/db/sql/user-creation.sql`, 'utf8');

    return {
        createScript,
        dropScript,
        rolesScript,
        usersScript
    }
};

module.exports = getDdlScripts;