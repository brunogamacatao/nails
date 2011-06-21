var rooms = require('./models');

exports.index = function(req, res) {
  rooms.all(function(rooms) {
    res.render('rooms/index.jade', {locals: {
      rooms: rooms
    }});
  });
};

exports.new = function(req, res) {
  res.render('rooms/new.jade', {locals: {
    room: req.body && req.body.room || rooms.new
  }});
};

exports.show = function(req, res) {
  res.render('rooms/show.jade', {locals: {
    room: req.room
  }});
};

exports.create = function(req, res) {
  rooms.insert(req.body.room, function(room) {
    res.redirect('/rooms/' + room.id);
  });
};

exports.edit = function(req, res) {
  res.render('rooms/edit.jade', {locals: {
    room: req.room
  }});
};

exports.update = function(req, res) {
  rooms.set(req.room.id, req.body.room, function() {
    res.redirect('/rooms/' + req.room.id);
  });
};

exports.load = function(id, callback) {
  rooms.find(id, function(room) {
    callback(null, room);
  });
};