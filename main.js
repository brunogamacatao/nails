var express = require('express');
require('express-resource');

var app = express.createServer();

//Generic configuration
app.configure(function() {
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/static'));  
});

//Deployment configuration 
app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

//Production configuration
app.configure('production', function() {
  app.use(express.errorHandler());
});

app.set('views', __dirname + '/templates');

//Setting up the URLs 
app.resource('tickets', require('./tickets/urls'));

app.listen(4000);
