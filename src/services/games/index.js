'use strict';

const service = require('feathers-sequelize');
const games = require('./games-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: games(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/games', service(options));

  // Get our initialize service to that we can bind hooks
  const gamesService = app.service('/games');

  // Set up our before hooks
  gamesService.before(hooks.before);

  // Set up our after hooks
  gamesService.after(hooks.after);
};
