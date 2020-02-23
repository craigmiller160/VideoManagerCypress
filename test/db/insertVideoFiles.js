
const INSERT_STMT = 'INSERT INTO video_files (description, display_name, file_name, file_added, last_modified, last_scan_timestamp, last_viewed, view_count, active) ' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

const insertVideoFiles = async (client, { files }) => {
    console.log('Inserting video files');
    const promises = files.map(async (file) => {
        const args = [
            file.description || '',
            file.displayName || '',
            file.fileName || '',
            file.fileAdded || '2020-01-01',
            file.lastModified || '2020-01-01',
            file.lastScanTimestamp || '2020-01-01',
            file.lastViewed || '2020-01-01',
            file.viewCount || 0,
            file.active || true
        ];
        await client.query(INSERT_STMT, args);
    });
    await Promise.all(promises);
};

module.exports = insertVideoFiles;