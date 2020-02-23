const cypress = require('cypress');
const { merge } = require('mochawesome-merge');
const fs = require('fs-extra');
const path = require('path');
const reportGenerator = require('mochawesome-report-generator');
const opn = require('opn');
const cypressConfig = require('../cypress');

const MA_REPORT_DIR = 'output/mochawesome-report';
const MA_REPORT_NAME = 'vm-test-report.html';

const cwd = process.cwd();
const { reporterOptions: { reportDir }, videosFolder, screenshotsFolder } = cypressConfig;

const clearPastTests = () => {
    console.log('Clearing past test data');
    fs.removeSync(path.resolve(cwd, reportDir));
    fs.removeSync(path.resolve(cwd, videosFolder));
    fs.removeSync(path.resolve(cwd, screenshotsFolder));
    fs.removeSync(path.resolve(cwd, MA_REPORT_DIR));
};

const runCypress = async () => {
    // TODO add a browser option to it
    const results = await cypress.run({
        spec: 'test/cypress/integration/working/**/*'
    });

    const report = await merge({
        files: [path.resolve(cwd, reportDir, '*.json')]
    });
    await reportGenerator.create(report, {
        reportDir: path.resolve(cwd, MA_REPORT_DIR),
        reportFilename: MA_REPORT_NAME
    });
};

clearPastTests();
runCypress()
    .then(() => {
        const reportFile = path.resolve(cwd, MA_REPORT_DIR, MA_REPORT_NAME);
        opn(reportFile);
    })
    .catch((error) => {
        console.log('Error executing test suite', error);
        process.exit(1);
    });