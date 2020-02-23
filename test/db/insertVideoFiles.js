
const INSERT_FILE_STMT = 'INSERT INTO video_files (description, display_name, file_name, file_added, last_modified, last_scan_timestamp, last_viewed, view_count, active) ' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

const INSERT_CATEGORY_STMT = 'INSERT INTO categories (category_name) VALUES ($1)';

const insertVideoFiles = async (client, { files, categories }) => {
    console.log('Inserting video files');
    let filePromises = [];
    let categoryPromises = [];

    if (categories) {
        categoryPromises = categories.map((category) => {
            const args = [
                category.categoryName || ''
            ];
            return client.query(INSERT_CATEGORY_STMT, args);
        });
    }

    if (files) {
        filePromises = files.map((file) => {
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
            return client.query(INSERT_FILE_STMT, args);
        });
    }

    const promises = filePromises.concat(categoryPromises);
    await Promise.all(promises);
};

module.exports = insertVideoFiles;
