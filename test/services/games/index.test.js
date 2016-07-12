'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const request = require('request');
const serviceUrl = 'http://localhost:3030/games';

describe('games service', function() {
  before(function(done) {
    app.get('sequelize').sync({ force: true })
      .then(() => {
        this.server = app.listen(3030);
        this.server.once('listening', () => done());
      });
  });

  after(function(done) {
    this.server.close(done);
  });

  it('registered the games service', () => {
    assert.ok(app.service('games'));
  });

  it('creates a game', function(done) {
    request({
      url: serviceUrl,
      method: 'POST',
      json: true,
      body: {
        text: 'text'
      }
    }, function(err, res, body) {
      assert.equal(res.statusCode, 201);
      assert.equal(body.text, 'text');
      done(err);
    });
  });
});
