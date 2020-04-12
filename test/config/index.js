const cloudConfigClient = require('cloud-config-client');
const { CLOUD_CONFIG_HOST } = require('../util/envConstants');

class CloudConfig {
    async init(env) {
        const config = await cloudConfigClient.load({
            endpoint: CLOUD_CONFIG_HOST,
            rejectUnauthorized: false,
            application: 'postgres',
            profiles: 'qa',
            auth: {
                user: '',
                pass: ''
            }
        });

        // TODO store the config values we need
    }
}