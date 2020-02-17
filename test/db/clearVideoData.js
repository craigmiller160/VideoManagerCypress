
const clearVideoData = (client) => {
    client.query('DELETE FROM file_categories');
    client.query('DELETE FROM file_stars');
    client.query('DELETE FROM file_series');
    client.query('DELETE FROM categories');
    client.query('DELETE FROM series');
    client.query('DELETE FROM stars');
    client.query('DELETE FROM video_files');
};

module.exports = clearVideoData;