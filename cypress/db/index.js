import getDdlScripts from './getDdlScripts';
import getClient from './getClient';
import createSchema from './createSchema';

class PG {
    constructor() {
        this.client = getClient();
    }

    async init() {
        const { createScript, dropScript } = await getDdlScripts();
        createSchema(this.client, createScript, dropScript);
    }
}

export default new PG();