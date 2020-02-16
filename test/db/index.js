const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');

class PG {
    constructor() { }

    async init(env) {
        const scripts = await getDdlScripts(env);
        this.client = getClient(env);
        await this.client.connect();
        await createSchema(this.client, scripts);
    }

    close() {
        this.client.close();
    }
}

module.exports = new PG();