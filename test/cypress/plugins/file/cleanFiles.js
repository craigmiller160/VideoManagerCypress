const { deleteVideos } = require('../../../file');

const cleanFiles = () => {
    deleteVideos();
};

module.exports = cleanFiles;