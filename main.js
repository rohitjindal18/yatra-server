
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var app = express();
var urlParser = bodyParser.urlencoded({extended : false})


app.use(bodyParser.json());

var token = "EAACEdEose0cBAIVbuDKRc3QwnGBWL9ZCgTWMeHDFUm6j1ZBnfpLPxY6nBzmV5QIlh1ZAF98P6WKM7UoA3hD6LBlykJ7mmzEqy401x0LANd4mU9PuEGZBMaLbKLM18hcfyZCztgJXMbsaFDvBnbTmlISyD4mAgbH4jWBMVxj5hKAZDZD";

app.get('/' , function(req , res) {
	request.get({ url: "https://graph.facebook.com/v2.7/me/?access_token="+token+"&fields=friends.limit(100)"},      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
              	    res.json(body); 
                 } 
             });
})

app.get('/fetchSelfProfilePhoto' , function(req , res) {
	request.get({ url: "https://graph.facebook.com/v2.7/"+req.query.id+"/picture?access_token="+token},      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
              	 	res.set('Access-Control-Allow-Origin', '*');
					res.set('Access-Control-Allow-Headers', 'Content-Type');
					res.set('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
					res.send(response);
                 }
               else {
               	console.log("error"+response.statusCode);
               } 
             });
})

app.get('/fetchFriends' , function(req , res) {
	request.get({ url: "https://graph.facebook.com/v2.7/"+req.query.id+"/friends?access_token="+token},      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
              	 	res.set('Access-Control-Allow-Origin', '*');
					res.set('Access-Control-Allow-Headers', 'Content-Type');
					res.set('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
					res.send(response.body);
                 }
               else {
               	console.log("error"+response.statusCode);
               } 
             });
})

app.get('/fetchFriendsProfilePhoto' , function(req , res) {
	request.get({ url: "https://graph.facebook.com/v2.7/"+req.query.id+"/picture?access_token="+token},      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
              	 	res.set('Access-Control-Allow-Origin', '*');
					res.set('Access-Control-Allow-Headers', 'Content-Type');
					res.set('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
					res.send(response);
                 }
               else {
               	console.log("error"+response.statusCode);
               } 
             });
})


app.options('/*' , function(req , res) {
	console.log("dddd");
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
				price : 5000 ,
				departTime : "04 : 50 am",
				arrivalTime : "11 : 30 am",
				duration : "06h 10m"
			},
			{
				flightName : "Spice Jet",
				price : 6000,
				departTime : "05 : 50 am",
				arrivalTime : "10 : 30 am",
				duration : "04h"
			}
		]
	}
	else if(req.body.sourceCity == "Bangalore" & req.body.destinationCity == "Mumbai"){
		response = [
			{
				flightName : "Indigo",
				price : 5000,
				departTime : "04 : 50 am",
				arrivalTime : "11 : 30 am",
				duration : "06h 10m"
			},
			{
				flightName : "Vistara",
				price : 6000,
				departTime : "04 : 50 am",
				arrivalTime : "11 : 30 am",
				duration : "06h 10m"
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