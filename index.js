"use strict";

var Cylon = require("cylon");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var handSend = 0;

io.on('connection', function(socket) {
  console.log('Un cliente se ha conectado');
    socket.emit('hand', handSend);
    Cylon.robot({
      connections: {
        leapmotion: { adaptor: "leapmotion" }
      },

      devices: {
        leapmotion: { driver: "leapmotion" }
      },

      work: function(my) {

        my.leapmotion.on("hand", function(hand) {
          handSend = {
            'direction' : hand.direction,
            'sphereRadius' : hand.sphereRadius,
            'valid' : hand.valid,
            'position' : hand.pointables[0].positions
          }
          //hand = hand.toString();
          io.sockets.emit('hand', handSend);

        });
      }
    }).start();

});

app.use(express.static('public'));

server.listen(8080, function() {
  console.log('Servidor corriendo en http://localhost:8080');
});
