var fetchUrl = require("fetch").fetchUrl;
var fs = require('fs');

//Domain list from file
var domains = fs.readFileSync('domains.txt').toString().split("\n");

console.log("Bad Status Codes:");
console.log("");

for (i = 0; i < domains.length; i++) { 
	fetchUrl(domains[i], function(error, meta){
		//Without the try catch you encounter crashes due to weird async problems (at least thats my guess)
		try {
			if (meta.status == 403 || 
				meta.status == 404 || 
				meta.status == 500 || 
				meta.status == 502 || 
				meta.status == 503 ) {
					//Outputs only the domains with "bad" Status Codes
					console.log("URL:" + meta.finalUrl.toString());
					console.log("StatusCode: "+ meta.status.toString());
					
					if (meta.cookieJar.cookies.http_in != undefined) {
						console.log("HTTP_in cookie: " + meta.cookieJar.cookies.http_in[0].value);
					}
					
					console.log("");
				}
			throw 'excpetion';
		}
			catch(e) {
		}
	});	
}