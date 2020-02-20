const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');
const setRootDir = require('./setRootDir');
const clearAllData = require('./clearAllData');
const { CLEAR_ALL_DATA, SET_ROOT_DIR } = require('./queryKeys');

class PG {
    constructor() { }

    async init(env) {
        const scripts = await getDdlScripts(env);
        this.client = getClient(env);
        await this.client.connect();
        await createSchema(this.client, scripts);
    }

    close() {
        this.client.end();
    }

    executeQuery(key, args) {
        switch (key) {
            case CLEAR_ALL_DATA:
                return clearAllData(this.client);
            case SET_ROOT_DIR:
                return setRootDir(this.client, args.rootDir);
            default:
                throw new Error(`Invalid query key: ${key}`);
        }
    }
}

module.exports = new PG();