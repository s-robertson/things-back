'use strict';

// game-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const User = require('../user/user-model');

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const game = sequelize.define('games', {
    code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    host: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  return game;
};
