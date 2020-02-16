const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');

// $2a$10$ytpfmAxR8lh9KwnWtkiinOYWn2779iJE3rE6BWLzHzwEh9Q9hJGv2

class PG {
    constructor() { }

    async init(env) {
        const { createScript, dropScript } = await getDdlScripts(env);
        this.client = getClient(env);
        await this.client.connect();
        await createSchema(this.client, dropScript, createScript);
    }
}

module.exports = new PG();