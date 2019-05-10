const request = require('request');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const getLinks = require('./getLinks');
const createFileList = require('./createFileList');
const fs = require('fs');
let selector = process.argv[2];

if(!selector){
	console.log("Error: Incorrect parameters supplied");
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
		console.log(`Copying from ${archive}`);
		var body = await rp(archive);
		var $ = cheerio.load(body);
		if(  !$(selector).attr("href") ) {
			throw "Please check the selector and try again.";
		}
		$(selector).each(function(){
			listOfLinks.push( $(this).attr("href") );
		});
	}
	catch(error){
		console.log("\n" + "Error: " + error);
		console.log("Archive: " + archive + "\n");
	}
}).then( ()=>{
	fs.writeFileSync("output_list.txt", listOfLinks.join("\n") );
	console.log("Done")
});



