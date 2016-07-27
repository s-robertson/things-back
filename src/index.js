'use strict';

require('dotenv').config();

const app = require('./app');

app.get('sequelize').sync({ force: app.get('forceDbSync') })
  .then(function() {
    const port = app.get('port');
    const server = app.listen(port);

    server.on('listening', () =>
      console.log(`Feathers application started on ${app.get('host')}:${port}`)
    );
  });
