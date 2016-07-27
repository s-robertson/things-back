'use strict';

const service = require('feathers-sequelize');
const game = require('./game-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: game(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  let gamesService = service(options);

  gamesService.generateCode = function() {
    // @TODO: write actual code functionality.
    return '12345';
  };

  // Initialize our service with any options it requires
  app.use('/games', gamesService);

  // Get our initialize service to that we can bind hooks
  const gameService = app.service('/games');

  // Set up our before hooks
  gameService.before(hooks.before);

  // Set up our after hooks
  gameService.after(hooks.after);
};
