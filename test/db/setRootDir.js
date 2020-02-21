const { getWorkingDirVideos } = require('../file/paths');

const setRootDir = async (client, rootDir) => {
    const defaultRootDir = getWorkingDirVideos();
    const dir = rootDir || defaultRootDir;

    await client.query('DELETE FROM settings');
    await client.query('INSERT INTO settings (settings_id, root_dir) VALUES (1, $1)', [ dir ]);
};

module.exports = setRootDir;