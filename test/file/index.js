const fs = require('fs-extra');

const createVideos = () => {
    const cwd = process.cwd();
    const videoWorkingDir = `${cwd}/workingDir/videos`;
    if (!fs.existsSync(videoWorkingDir)) {
        fs.mkdirSync(videoWorkingDir, { recursive: true });
    }

    const testVideoFile = `${cwd}/files/videos/test-video.mp4`;
    [...new Array(10).keys()]
        .forEach((index) => {
            const outputFile = `${videoWorkingDir}/test-video-${index}.mp4`;
            fs.copyFileSync(testVideoFile, outputFile);
        });
};

const deleteVideos = () => {
    const cwd = process.cwd();
    const videoWorkingDir = `${cwd}/workingDir/videos`;
    if (fs.existsSync(videoWorkingDir)) {
        fs.removeSync(videoWorkingDir);
    }
};

module.exports = {
    createVideos,
    deleteVideos
};