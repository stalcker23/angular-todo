const http = require('http');
const data = require('./data/data.json');

const express = require("express");
const app = express();

app.use(function(req, res, next) {
	var reqOrigin = req.get('origin');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Origin', reqOrigin);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	}
	else {
		next();
	}
});

app.get("/", function(req, res){
    res.json(data);
});

app.listen(8000, function () { console.log('Example app listening on port 8000!') });