var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RoomSchema = new Schema({
  number: Number,
  name:  String,
});

mongoose.model('Room', RoomSchema);

var Room = mongoose.model('Room');

module.exports.all = function(callback) {
  Room.find({}, function(err, rooms) {
    callback(rooms);
  });
};

module.exports.create = function() {
};

module.exports.find = function(id, callback) {
  Room.findById(id, function(err, product) {
    callback(product);
  });
};

module.exports.new = function() {
  return new Room();
};

module.exports.insert = function(room, callback) {
  room = new Room(room);
  room.save(function(err) {
    callback(room);
  });
};

module.exports.set = function(id, room, callback) {
  Room.findById(id, function(err, storedRoom) {
    storedRoom.number = room.number;
    storedRoom.name   = room.name;
    storedRoom.save(function(err) {
      callback();
    });
  });
};