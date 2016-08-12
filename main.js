
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlParser = bodyParser.urlencoded({extended : false})

app.use(bodyParser.json());

app.get('/' , function(req , res) {
	res.send("Hello World 123");
})

app.options('/fetchFlight' , function(req , res) {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', 'Content-Type');
	res.set('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
	res.send("Success");
})

app.post('/fetchFlight',  urlParser , function(req , res) {
	//Prepare output on the basis of Input
	var response = [];
	console.log("Req came " +req.body.sourceCity);
	if(req.body.sourceCity == "Bangalore" & req.body.destinationCity == "Delhi"){
		response = [
			{
				flightName : "AirIndia",
				price : 5000
			},
			{
				flightName : "Spice Jet",
				price : 6000
			}
		]
	}
	else if(req.body.sourceCity == "Bangalore" & req.body.destinationCity == "Mumbai"){
		response = [
			{
				flightName : "Indigo",
				price : 5000
			},
			{
				flightName : "Vistara",
				price : 6000
			}
		]
		
	}

	console.log("Resp recived"+response);
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With');
	res.set('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
	res.status(200).send(response);
})


var server = app.listen(7777 , 'localhost' , function() {
	var host = server.address().address
	var port = server.address().port
	console.log(host);
	console.log("Server listening on %s:%s"  ,host ,port)
})