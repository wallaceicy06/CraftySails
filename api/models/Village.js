/**
* Village.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var GRID_WIDTH = 24;
var GRID_HEIGHT = 16;
var MAX_VILLAGES = 5;

module.exports = {

  autosubscribe: ['destroy', 'update'],

  schema: true,

  attributes: {
    loc_x: {type: 'integer'},
    loc_y: {type: 'integer'}
  },

  afterDestroy: function (destroyedRecords, cb) {
    Village.find({}, function(err, records) {
      if (records.length == 0) {
        Village.resetBoard();
      } 
    });
    cb();
  },

  resetBoard: function () {
    var num_villages = 0;

    for (var x = 1; x < GRID_WIDTH - 1; x++) {
      for (var y = 1; y < GRID_HEIGHT - 1; y++) {
        if (Math.random() < 0.03) {
          if (num_villages < MAX_VILLAGES) {
            Village.create({loc_x: x, loc_y: y}, function(err, village) {
              if (err) console.error(err);
            });
            num_villages++;
          }
        }
      }
    }     
  }

};

