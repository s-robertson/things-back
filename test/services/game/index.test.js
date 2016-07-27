'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const expect = require('chai').expect;

describe('game service', function() {
  const gamesService = app.service('games');

  it('registered the games service', () => {
    assert.ok(gamesService);
  });

  it('creates a game', function(done) {
    gamesService.create({
      host: 1,
      status: 'active',
    })
      .then(function(game) {
        expect(game.host).to.equal(1);
        expect(game.status).to.equal('active');
        expect(game.code).to.be.a('string');
        done();
      })
      .catch(err => done(err));
  });
});
