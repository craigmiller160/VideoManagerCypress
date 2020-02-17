const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');

let client = null;

const init = async (env) => {
    const scripts = await getDdlScripts(env);
    this.client = getClient(env);
    await client.connect();
    await createSchema(client, scripts);
};

const close = () => {
    client.close();
};

module.exports = {
    init,
    close
};