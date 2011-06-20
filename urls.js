module.exports.setUp = function(app) {
  app.get('/', function(req, res) {
    res.render('root.jade');
  });

  var tickets = require('./tickets/tickets');

  app.get('/tickets', function(req, res) {
    tickets.all(function(tickets) {
      res.render('tickets/index.jade', {locals: {
        tickets: tickets
      }});
    });
  });

  app.get('/tickets/new', function(req, res) {
    res.render('tickets/new.jade', {locals: {
      ticket: req.body && req.body.ticket || tickets.new
    }});
  });

  app.post('/tickets', function(req, res) {
    tickets.insert(req.body.ticket, function(ticket) {
      res.redirect('/tickets/' + ticket.id);
    });
  });

  app.get('/tickets/:id', function(req, res) {
    tickets.find(req.params.id, function(ticket) {
      res.render('tickets/show.jade', {locals: {
        ticket: ticket
      }});
    });
  });

  app.get('/tickets/:id/edit', function(req, res) {
    tickets.find(req.params.id, function(ticket) {
      res.render('tickets/edit.jade', {locals: {
        ticket: ticket
      }});
    });
  });

  app.put('/tickets/:id', function(req, res) {
    var id = req.params.id;
    
    tickets.set(id, req.body.ticket, function() {
      res.redirect('/tickets/' + id);
    });
  });
};