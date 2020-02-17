const clearRootDir = async (client) => {
    await client.query('DELETE FROM settings');
};

module.exports = clearRootDir;