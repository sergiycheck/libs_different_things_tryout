const fs = require('fs');
const folderPath = `${__dirname}/../../`

fs.readdir(folderPath,(err,files)=>{
	files.forEach(file=>{
		console.log(file);
	})
})