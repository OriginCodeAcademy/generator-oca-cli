#!/usr/bin/env node

const program = require('commander');
const version = require('../package.json').version;

program
    .version(version)
    .command('start [project]', 'start an assignment')
    .command('test', 'run tests for the current project')
    .parse(process.argv);