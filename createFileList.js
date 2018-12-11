const fs = require('fs');
const path = require('path');

const createString = (listOfLinks)=>{
    var writeString ="";
    listOfLinks.forEach((link)=>{
        writeString = writeString + link + "\n";
    });
    return writeString;   
};

const writeToFile = (data, filename = "./output_list.txt")=>{
    fs.writeFileSync(path.resolve(filename), data);
};

module.exports = function(listOfLinks, filename){
   writeToFile(createString(listOfLinks), filename);
}