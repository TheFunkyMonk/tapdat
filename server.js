var static = require('node-static'),
    five = require('johnny-five')
    board = new five.Board(),
    tilt;

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./dist');

var server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
})

server.listen(8080);

var io = require('socket.io').listen(server);

//
// Arduino code
//
var five = require('johnny-five'),
   board = new five.Board(),
   tilt;

board.on('ready', function() {
 var tilt = new five.Button(2),
 greenLed = new five.Led(7),
 redLed = new five.Led(8),
 totalTimePoured = 0,
 pourStartTime = 0,
 holdCalled = false;

 board.repl.inject({
   button: tilt
 })

 tilt.on('down', function() {
   pourStartTime = new Date().getTime();
   holdCalled = false;

   console.log('START POURIN: ' + pourStartTime);
   greenLed.on()
   redLed.off()
 })

 tilt.on('hold', function() {
   holdCalled = true;
   var currentTime = new Date().getTime();
   console.log('BEEN POURIN FOR: ' + (currentTime - pourStartTime) + ' MILLISECONDS');
 })

 tilt.on('up', function() {
   redLed.on()
   greenLed.off();

   var endTime = new Date().getTime();
   var thisPourLength = (endTime - pourStartTime);
   pourStartTime = endTime;

   // 500 millisecond hysteresis to get rid of some sensor noise
   if (holdCalled && thisPourLength > 500) {
       addPourTimeToTotal(thisPourLength);
       console.log('BEERS DONE, POURED FOR: ' + thisPourLength + ' MILLISECONDS');
       console.log('TOTAL FOR ALL POURS: ' + totalTimePoured + ' MILLISECONDS');
   }
   else {
       console.log('POUR TOO SHORT');
   }

   holdCalled = false;
 })

 this.on('exit', function() {
   greenLed.off()
   redLed.off()
 })

 function reset() {
     totalTimePoured = 0;
 }

 function addPourTimeToTotal(time) {
     totalTimePoured += time;
     // update UI
 }

})