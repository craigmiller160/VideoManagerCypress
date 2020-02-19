
const clearAllData = async (client) => {
    console.log('Clearing non-auth DB records');
    await client.query('DELETE FROM file_categories');
    await client.query('DELETE FROM file_stars');
    await client.query('DELETE FROM file_series');
    await client.query('DELETE FROM categories');
    await client.query('DELETE FROM series');
    await client.query('DELETE FROM stars');
    await client.query('DELETE FROM video_files');
    await client.query('DELETE FROM settings');
};

module.exports = clearAllData;