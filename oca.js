const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();
const fs = require('fs');
const path = require('path');
const program = require('commander');

program
    .version('0.9.0')
    .command('start [project]', 'start a new project')
    .command('generate [projectType]', 'generate a folder structure for a given project type')
    .parse(process.argv);

//////////////////

getGenerators()
    .then(loadGenerators);

//////////////////

function getGenerators() {
    const generatorDirectory = path.join(__dirname, 'generators');

    return new Promise(function(resolve, reject) {
        fs.readdir(generatorDirectory, function(err, files) {
            if(err) {
                return reject(err);
            }
            resolve(files.filter(f => fs.statSync(path.join(generatorDirectory, f)).isDirectory()));
        });
    });
}

function loadGenerators(generators) {
    generators
        .forEach(name => {
            const generator = require(`./generators/${name}`);

            env.registerStub(generator, `oca-cli:${name}`);
        });
}

function runGenerator(name) {
    env.run(`oca-cli:${name}`);
}