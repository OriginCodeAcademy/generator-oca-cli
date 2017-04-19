const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();
const fs = require('fs');
const path = require('path');
const program = require('commander');

program.parse(process.argv);

//////////////////

getGenerators()
    .then(loadGenerators)
    .then(runGenerator);

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

function runGenerator() {
    env.run(`oca-cli:${program.args[0]}`);
}