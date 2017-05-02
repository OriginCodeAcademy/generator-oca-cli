const Generator = require('yeoman-generator');
const path = require('path');
const colors = require('colors');

module.exports = (generatorName) => class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('folderName', { type: String, required: false });
    }

    copyFiles() {
        const destinationPath = this.destinationPath(this.options.folderName || generatorName);

        this.fs.copy(path.join(__dirname, `../generators/${generatorName}/template/`), destinationPath);
        this.fs.copy(path.join(__dirname, `../generators/${generatorName}/template/.*`), destinationPath);
    }

    install() {
        process.chdir(this.destinationPath(this.options.folderName || generatorName));

        this.npmInstall();
        this.bowerInstall();
    }

    end() {
        console.log('\nProject successfully generated!'.underline.white);
        console.log('\nWe suggest you begin by typing:')
        console.log(`\n  ${'cd'.bgBlue} ${this.options.folderName || generatorName}`)
        console.log(`  ${'npm test'.bgBlue}\n`)
    }
}