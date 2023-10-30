const fs = require("fs");

const  writeFile = (fileName, data) => {
	data = JSON.stringify(data);
	fs.writeFile(fileName, data, "utf8", function (err) {
		if (err) {
			console.log("Something error while writing JSON Object to File.");
			return console.log(err);
		}
		console.log(`JSON file has been saved.`);
	});
}

module.exports = { writeFile };
