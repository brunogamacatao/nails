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

app.get('/', function(req, res) {
  res.render('root.jade');
});

var tickets = require('./tickets/tickets');

app.get('/tickets', function(req, res) {
  res.render('tickets/index.jade', {locals: {
    tickets: tickets.all
  }});
});

app.get('/tickets/new', function(req, res) {
  res.render('tickets/new.jade', {locals: {
    ticket: req.body && req.body.ticket || tickets.new
  }});
});

app.post('/tickets', function(req, res) {
  var id = tickets.insert(req.body.ticket);
  res.redirect('/tickets/' + id);
});

app.get('/tickets/:id', function(req, res) {
  var ticket = tickets.find(req.params.id);
  res.render('tickets/show.jade', {locals: {
    ticket: ticket
  }});
});

app.get('/tickets/:id/edit', function(req, res) {
  var ticket = tickets.find(req.params.id);
  res.render('tickets/edit.jade', {locals: {
    ticket: ticket
  }});
});

app.put('/tickets/:id', function(req, res) {
  var id = req.params.id;
  var ticket = tickets.find(id);
  tickets.set(req.params.id, req.body.ticket);
  res.redirect('/tickets/' + id);
});

app.listen(4000);
