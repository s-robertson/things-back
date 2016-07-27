'use strict';

require('dotenv').config();

const assert = require('assert');
const request = require('request');
const app = require('../src/app');

describe('Things application tests', function() {
  before(function(done) {
    app.get('sequelize').sync({ force: app.get('forceDbSync') })
      .then(() => {
        this.server = app.listen(3030);
        this.server.once('listening', () => done());
      });
  });

  after(function(done) {
    this.server.close(done);
  });

  describe('404', function() {
    it('shows a 404 HTML page', function(done) {
      request({
        url: 'http://localhost:3030/path/to/nowhere',
        headers: {
          'Accept': 'text/html'
        }
      }, function(err, res, body) {
        assert.equal(res.statusCode, 404);
        assert.ok(body.indexOf('<html>') !== -1);
        done(err);
      });
    });

    it('shows a 404 JSON error without stack trace', function(done) {
      request({
        url: 'http://localhost:3030/path/to/nowhere',
        json: true
      }, function(err, res, body) {
        assert.equal(res.statusCode, 404);
        assert.equal(body.code, 404);
        assert.equal(body.message, 'Page not found');
        assert.equal(body.name, 'NotFound');
        done(err);
      });
    });
  });
});
