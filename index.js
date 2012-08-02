#!/usr/bin/env node

var fs = require('fs');
var dot = require('dot');

var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var program = require('commander');


program
  .version('0.0.1')
  .usage('dot-packer')
  .option('-d, --dir [value]', 'Target directory <path>')
  .option('-o, --output [value]', 'Output file <path>', "jst.js")
  .option('-n, --ns [value]', 'The GLOBAL variable to pack the templates in',"JST")
  .parse(process.argv);


if (!program.dir){
    console.log("The target directory path is required. -h for help");
}
else  {
	
	try {
		
		var code = program.ns + "= function(){ return new Function();};";
        var file = null;
		var files = fs.readdirSync(program.dir);
		for (i in files) {
			if (files[i].match(/^[^\.]*\.jst/g)) {
				console.log("Processing:" + files[i]);
				code += convert(files[i],program.ns)+"\r\n";
			}
		}
		
		var ast = jsp.parse(code); // parse code and get the initial AST
        ast = pro.ast_mangle(ast); // get a new AST with mangled names
        ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
        var final_code = pro.gen_code(ast); // compressed code here
        
		fs.writeFileSync(program.output,final_code, 'ascii');
	}
	
	catch(err) {
		dumpError(err);
	}
}

function convert(fileName, namespace){
	var path = program.dir + fileName;
	var data = fs.readFileSync(path, 'ascii');
    var code = dot.template(data).toString();
    var header = namespace+"['"+fileName.replace('.jst','')+"'] = function(it)";
    code = code.replace('function anonymous(it)', header)+";";
	return code;
}

function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  } else {
    console.log('dumpError :: argument is not an object');
  }
}


