const request = require('request');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const getLinks = require('./getLinks');
const createFileList = require('./createFileList');
const fs = require('fs');


var archives = getLinks('input_list.txt');
var listOfLinks = [];

archives.forEach(async function(archive){
	try{
		var body = await rp(archive);
		var $ = cheerio.load(body);
		$(".header-post h2 a").each(function(){
			fs.appendFileSync("output_list.txt", $(this).attr("href") +"\n");
		});
		console.log("inner");
	}
	catch(error){
		console.log("\n" + "Error: " + error);
		console.log("Archive: " + archive + "\n");
	}
});


