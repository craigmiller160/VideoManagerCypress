const { cloudConfig } = require('../../../config');

const initConfig = async ({ env }) => {
    await cloudConfig.init(env);
    return null;
};

module.exports = initConfig;