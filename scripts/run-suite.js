const cypress = require('cypress');
const { merge } = require('mochawesome-merge');
const fs = require('fs-extra');
const path = require('path');
const reportGenerator = require('mochawesome-report-generator');
const cypressConfig = require('../cypress');

const MA_REPORT = 'output/mochawesome-report';

const cwd = process.cwd();
const { reporterOptions: { reportDir }, videosFolder, screenshotsFolder } = cypressConfig;

const clearPastTests = () => {
    console.log('Clearing past test data');
    fs.removeSync(path.resolve(cwd, reportDir));
    fs.removeSync(path.resolve(cwd, videosFolder));
    fs.removeSync(path.resolve(cwd, screenshotsFolder));
    fs.removeSync(path.resolve(cwd, MA_REPORT));
};

const runCypress = async () => {
    // TODO add error handling
    // TODO add a browser option to it
    const results = await cypress.run({
        spec: 'test/cypress/integration/working/**/*'
    });

    console.log(results); // TODO delete this

    // TODO what if there are no results?

    const report = await merge({
        files: [path.resolve(cwd, reportDir, '*.json')]
    });
    await reportGenerator.create(report, {
        reportDir: path.resolve(cwd, MA_REPORT)
    });
};

clearPastTests();
runCypress();