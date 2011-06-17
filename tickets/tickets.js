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

module.exports.all = tickets;

module.exports.create = function() {
};

module.exports.find = function(id) {
  var i;
  id = parseInt(id, 10);
  
  for (i = 0; i < tickets.length; i++) {
    if (tickets[i].id === id) {
      return tickets[i];
    }
  }
  
  return undefined;
};

module.exports.new = function() {
  return {};
};

module.exports.insert = function(ticket) {
  var id = tickets.length + 1;
  
  ticket.id   = id;
  ticket.date = Date.now();
  tickets[id - 1] = ticket;
  
  return id;
};

module.exports.set = function(id, ticket) {
  var i;
  id = parseInt(id, 10);
  
  for (i = 0; i < tickets.length; i++) {
    if (tickets[i].id === id) {
      tickets[i].table = ticket.table;
      tickets[i].date  = Date.now();
      return;
    }
  }
  
  throw {message: 'Could not find a product with the id ' + id};
};