const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');

class PG {
    constructor() { }

    async init(env) {
        const { createScript, dropScript } = await getDdlScripts(env);
        this.client = getClient(env);
        createSchema(this.client, createScript, dropScript);
    }
}

module.exports = new PG();