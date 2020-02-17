const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');
const clearVideoData = require('./clearVideoData');
const { CLEAR_VIDEO_DATA } = require('./queryKeys');


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

    async executeQuery(key) {
        if (CLEAR_VIDEO_DATA === key) {
            await clearVideoData(this.client);
        }
    }
}

module.exports = new PG();