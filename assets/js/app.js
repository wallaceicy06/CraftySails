/**
 * app.js
 *
 * Front-end code and event handling for sailsChat
 *
 */


// Attach a listener which fires when a connection is established:
io.socket.on('connect', function socketConnected() {

  io.socket.get('/village', function(data) {console.log(data)});

  io.socket.on('village', function(data) {
    console.log(data);
    if (data.verb === 'destroyed') {
      console.log('destroying a village');
      Crafty('Village').each(function(i) {
        if (this.id == data.previous.id) {
          this.destroy();
        }
      });
    }
  });

  Game.start();  

});


