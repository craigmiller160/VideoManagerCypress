const fs = require('fs-extra');
const { getWorkingDirVideos, getSampleFilesDirVideos } = require('./paths');

const createVideos = () => {
    const videoWorkingDir = getWorkingDirVideos();
    if (!fs.existsSync(videoWorkingDir)) {
        fs.mkdirSync(videoWorkingDir, { recursive: true });
    }

    const sampleVideosDir = getSampleFilesDirVideos();
    const testVideoFile = `${sampleVideosDir}/test-video.mp4`;
    [...new Array(10).keys()]
        .forEach((index) => {
            const outputFile = `${videoWorkingDir}/test-video-${index}.mp4`;
            fs.copyFileSync(testVideoFile, outputFile);
        });
};

const deleteVideos = () => {
    const videoWorkingDir = getWorkingDirVideos();
    if (fs.existsSync(videoWorkingDir)) {
        fs.removeSync(videoWorkingDir);
    }
};

module.exports = {
    createVideos,
    deleteVideos
};