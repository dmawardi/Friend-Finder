// Import package
var express = require('express');
var path = require('path');

// Init express and assign port
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle Routing
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/survey.html'))
});

// Set server to listen to PORT
app.listen(PORT, function(){
    console.log('Listening to Port: '+PORT);
});