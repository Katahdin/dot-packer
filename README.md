dot-packer.js - precompile,compress, and pack doT.js javascript template(s) into one js file.

dot-packer
==========

## Installation: 
	
>npm install -g dot-packer
	
>>Note: Based on your permissions you may have to use sudo

## Dependencies:
>1.	doT - The fastest + concise javascript template engine
>2.	UglifyJS – a JavaScript parser/compressor/beautifier

##Usage:  

>dot-packer -d templates/ -o ./templates.js

##Options:

>-d 	Target directory <path>
>-o	Output file <path>
>-n  The GLOBAL variable to pack the templates in. (default:JST)
	

##Example:
	
>Create a doT.js template (templates/sample.jst).

	<ul id="scores">
		{{~scores:score:index}}
			<li>{{=score}}</li>
		{{~}}
	</ul>

>>dot-packer -d templates/ -o ./templates.js

>Once you include the templates.js in your webpage you can access
>the template in javascript.

>>html = JST.sample(data);