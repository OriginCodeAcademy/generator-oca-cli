// or more concisely
const sys = require('sys')
const exec = require('child_process').exec;

function puts(error, stdout, stderr) { 
    sys.puts(stdout);
}

exec("npm test", puts);