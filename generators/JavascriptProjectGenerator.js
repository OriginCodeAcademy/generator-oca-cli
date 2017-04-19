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
}