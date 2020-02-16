const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');

// $2a$10$ytpfmAxR8lh9KwnWtkiinOYWn2779iJE3rE6BWLzHzwEh9Q9hJGv2

class PG {
    constructor() { }

    async init(env) {
        const scripts = await getDdlScripts(env);
        this.client = getClient(env);
        await this.client.connect();
        await createSchema(this.client, scripts);
    }
}

module.exports = new PG();