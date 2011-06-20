var express = require('express');
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
require('./urls').setUp(app);

app.listen(4000);
