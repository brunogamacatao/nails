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
  
  for (i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id)
      return tickets[i];
  }
  
  return undefined;
};