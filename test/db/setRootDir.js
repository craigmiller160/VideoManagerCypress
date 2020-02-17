const setRootDir = async (client, videoDir) => {
    const cwd = process.cwd();
    const defaultVideoDir = `${cwd}/workingDir/videos`;
    const dir = videoDir || defaultVideoDir;

    await client.query('DELETE FROM settings');
    await client.query('INSERT INTO settings (settings_id, root_dir) VALUES (1, $1)', [ dir ]);
};

module.exports = setRootDir;