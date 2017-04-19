const program = require('commander');
const version = require('./package.json').version;

program
    .version(version)
    .command('start [project]', 'start a new project')
    .command('generate [projectType]', 'generate a folder structure for a given project type')
    .parse(process.argv);

