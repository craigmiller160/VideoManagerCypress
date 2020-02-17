const setRootDir = async (client, rootDir) => {
    const cwd = process.cwd();
    const defaultRootDir = `${cwd}/workingDir/videos`;
    const dir = rootDir || defaultRootDir;

    await client.query('DELETE FROM settings');
    await client.query('INSERT INTO settings (settings_id, root_dir) VALUES (1, $1)', [ dir ]);
};

module.exports = setRootDir;