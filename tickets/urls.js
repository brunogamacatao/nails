var tickets = require('./models');

exports.index = function(req, res) {
  tickets.all(function(tickets) {
    res.render('tickets/index.jade', {locals: {
      tickets: tickets
    }});
  });
};

exports.new = function(req, res) {
  res.render('tickets/new.jade', {locals: {
    ticket: req.body && req.body.ticket || tickets.new
  }});
};

exports.show = function(req, res) {
  res.render('tickets/show.jade', {locals: {
    ticket: req.ticket
  }});
};

exports.create = function(req, res) {
  tickets.insert(req.body.ticket, function(ticket) {
    res.redirect('/tickets/' + ticket.id);
  });
};

exports.edit = function(req, res) {
  res.render('tickets/edit.jade', {locals: {
    ticket: req.ticket
  }});
};

exports.update = function(req, res) {
  tickets.set(req.ticket.id, req.body.ticket, function() {
    res.redirect('/tickets/' + req.ticket.id);
  });
};

exports.load = function(id, callback) {
  tickets.find(id, function(ticket) {
    callback(null, ticket);
  });
};