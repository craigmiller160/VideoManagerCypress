
const getWorkingDir = () => `${process.cwd()}/workingDir`;
const getWorkingDirVideos = () => `${getWorkingDir()}/videos`;
const getSampleFilesDir = () => `${process.cwd()}/files`;
const getSampleFilesDirVideos = () => `${getSampleFilesDir()}/videos`;

module.exports = {
    getWorkingDir,
    getWorkingDirVideos,
    getSampleFilesDir,
    getSampleFilesDirVideos
};