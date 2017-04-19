const Generator = require('yeoman-generator');
const path = require('path');

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
    }

    end() {
        console.log('\nProject successfully generated!\n');
        console.log('We suggest you begin by typing:')
        console.log(`  \x1b[44m%s\x1b[0m ${this.options.folderName || generatorName}`, 'cd')
        console.log(`  \x1b[44m%s\x1b[0m`, 'npm test\n')
    }
}