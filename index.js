const request = require('request');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const getLinks = require('./getLinks');
const createFileList = require('./createFileList');
const chalk = require('chalk');
const fs = require('fs');
let selector = process.argv[2];

if(!selector){
	console.log( chalk.red("Error: Incorrect parameters supplied") );
	process.exit(1);
}

var archives = getLinks('input_list.txt');
var listOfLinks = [];

async function asyncForEach(array, callback){
	for(let i = 0; i < array.length; i++){
		await callback( array[i] );
	}
}

asyncForEach( archives, async function(archive){
	try{
		console.log( chalk.blue(`Copying from ${archive}`) );
		var body = await rp({
			uri: archive,
			headers : {
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
			}
		});
		var $ = cheerio.load(body);
		if(  !$(selector).attr("href") ) {
			throw "Please check the selector and try again.";
		}
		$(selector).each(function(){
			listOfLinks.push( $(this).attr("href") );
		});
	}
	catch(error){
		console.log( chalk.red("\n" + "Error: " + error) );
		console.log( chalk.red("Archive: " + archive + "\n") );
	}
}).then( ()=>{
	fs.writeFileSync("output_list.txt", listOfLinks.join("\n") );
	console.log( chalk.green("Done! Posts should be in the output text file. Check if the number of posts is correct.") );
});



