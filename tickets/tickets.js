var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TicketSchema = new Schema({
  ticket: Number,
  table:  Number,
  date:   Date
});

mongoose.connect('mongodb://localhost/tickets_db');
mongoose.model('Ticket', TicketSchema);

var Ticket = mongoose.model('Ticket');

var tickets = [
{
  id: 1,
  table: 1,
  date: Date.now()
},
{
  id: 2,
  table: 2,
  date: Date.now()
},
{
  id: 3,
  table: 3,
  date: Date.now()
}
];

module.exports.all = function(callback) {
  Ticket.find({}, function(err, tickets) {
    callback(tickets);
  });
};

module.exports.create = function() {
};

module.exports.find = function(id, callback) {
  Ticket.findById(id, function(err, product) {
    callback(product);
  });
};

module.exports.new = function() {
  return new Ticket();
};

module.exports.insert = function(ticket, callback) {
  ticket.ticket = 0;
  ticket.date   = Date.now();
  
  ticket = new Ticket(ticket);
  ticket.save(function(err) {
    callback(ticket);
  });
};

module.exports.set = function(id, ticket, callback) {
  Ticket.findById(id, function(err, storedTicket) {
    storedTicket.table = ticket.table;
    storedTicket.date  = Date.now();
    storedTicket.save(function(err) {
      callback();
    });
  });
};