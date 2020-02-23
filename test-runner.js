const cypress = require('cypress');
const yargs = require('yargs');
const { merge } = require('mochawesome-merge');
const marge = require('mochawesome-report-generator');
const rm = require('rimraf');
const cypressConfig = require('./cypress');
const ls = require('ls');

console.log(cypressConfig.reporterOptions); // TODO delete this

// TODO probably don't need this
const argv = yargs.options({
    'browser': {
        alias: 'b',
        describe: 'choose browser that you wanna run tests on',
        default: 'chrome',
        choices: ['chrome', 'electron']
    },
    'spec': {
        alias: 's',
        describe: 'run test with specific spec file',
        default: 'cypress/integration/*.spec.js'
    }
}).help()
    .argv;

const reportDir = cypressConfig.reporterOptions.reportDir;
const reportFiles = `${reportDir}/*.json`;
// list all of existing report files
ls(reportFiles, { recurse: true }, file => console.log(`removing ${file.full}`));

// delete all existing report files
rm(reportFiles, (error) => {
    if (error) {
        console.error(`Error while removing existing report files: ${error}`);
        process.exit(1)
    }
    console.log('Removing all existing report files successfully!')
});

function generateReport(options) {
    return merge(options).then((report) => {
        marge.create(report, options)
    });
}

cypress.run({
    // browser: argv.browser,
    spec: 'test/cypress/integration/working/**/*'
}).then((results) => {
    // TODO if no tests are found, this will blow up
    const reporterOptions = {
        reportDir: results.config.reporterOptions.reportDir,
    };
    generateReport({
        files: ['./reports/*.json']
    })
}).catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
});

