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
    switch (data.verb) {
      case 'destroyed':
        console.log('destroying a village');
        Crafty('Village').each(function(i) {
          if (this.id == data.previous.id) {
            this.destroy();
            if (Crafty('Village').length == 0) {
              Crafty.scene('Victory');
            }
          }
        });
        break;
      case 'created':
        console.log('creating a village');
        console.log(data);
        Crafty('Village').at(data.data.loc_x, data.data.loc_y).setId(data.data.id);
        break;
      case 'messaged':
        console.log('we were messaged');
        break;
    }
  });

  Game.start();  

});


