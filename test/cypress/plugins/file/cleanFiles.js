const { deleteVideos } = require('../../../file');

const cleanFiles = () => {
    deleteVideos();
    return null;
};

module.exports = cleanFiles;