const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');

class PG {
    constructor() { }

    async init() {
        const { createScript, dropScript } = await getDdlScripts();
        this.client = getClient();
        createSchema(this.client, createScript, dropScript);
    }
}

module.exports = new PG();