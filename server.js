// Import package
var express = require('express');
var api = require("./app/routing/apiRoutes");
var html = require('./app/routing/htmlRoutes');
var path = require('path');

// Init express and assign port
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('app/public'));

// Handle Routing
// HTML and API routing references
// app.use('/api', api);
app.use('/', html);

// Set server to listen to PORT
app.listen(PORT, function(){
    console.log('Listening to Port: '+PORT);
});