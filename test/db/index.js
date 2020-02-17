const getDdlScripts = require('./getDdlScripts');
const getClient = require('./getClient');
const createSchema = require('./createSchema');
const clearVideoData = require('./clearVideoData');
const { CLEAR_VIDEO_DATA } = require('./queryKeys');

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

const executeSql = (key) => {
    if (CLEAR_VIDEO_DATA === key) {
        clearVideoData(client);
    }
};

module.exports = {
    init,
    close,
};