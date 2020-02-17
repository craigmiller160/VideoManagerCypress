const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');
const clearVideoData = require('./clearVideoData');
const setRootDir = require('./setRootDir');
const { CLEAR_VIDEO_DATA, SET_VIDEO_DIR } = require('./queryKeys');


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
            case CLEAR_VIDEO_DATA:
                return clearVideoData(this.client);
            case SET_VIDEO_DIR:
                return setRootDir(this.client, args.rootDir);
            default:
                throw new Error(`Invalid query key: ${key}`);
        }
    }
}

module.exports = new PG();