const cloudConfigClient = require('cloud-config-client');
const shellEnv = require('shell-env');
const { CLOUD_CONFIG_HOST } = require('../util/envConstants');

const POSTGRES_HOST = 'postgres.host';
const POSTGRES_PORT = 'postgres.port';
const POSTGRES_USER = 'postgres.username';
const POSTGRES_PASS = 'postgres.password';
const CONFIG_LOADED = 'config.loaded';

class CloudConfig {
    constructor() {
        this.config = {
            [CONFIG_LOADED]: false
        };
    }

    async init(env) {
        if (this.config[CONFIG_LOADED]) {
            console.log('Config already loaded, skipping');
            return;
        }

        console.log('Loading cloud config values');

        const { CONFIG_SERVER_USER, CONFIG_SERVER_PASSWORD } = shellEnv.sync();
        const config = await cloudConfigClient.load({
            endpoint: env[CLOUD_CONFIG_HOST],
            rejectUnauthorized: false,
            application: 'postgres',
            profiles: 'qa',
            auth: {
                user: CONFIG_SERVER_USER,
                pass: CONFIG_SERVER_PASSWORD
            }
        });

        this.config[POSTGRES_HOST] = config.get(POSTGRES_HOST);
        this.config[POSTGRES_PORT] = config.get(POSTGRES_PORT);
        this.config[POSTGRES_USER] = config.get(POSTGRES_USER);
        this.config[POSTGRES_PASS] = config.get(POSTGRES_PASS);
        this.config[CONFIG_LOADED] = true;
    }
}

module.exports = {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASS,
    cloudConfig: new CloudConfig()
};
