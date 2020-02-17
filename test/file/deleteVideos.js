const fs = require('fs');

const deleteVideos = () => {
    const cwd = process.cwd();
    const videoWorkingDir = `${cwd}/workingDir/videos`;
    fs.rmdirSync(videoWorkingDir, { recursive: true });
};

module.exports = deleteVideos;