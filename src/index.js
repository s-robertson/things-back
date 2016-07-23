'use strict';

const app = require('./app');

app.get('sequelize').sync({ force: process.env.DB_FORCE_SYNC })
  .then(function() {
    const port = app.get('port');
    const server = app.listen(port);

    server.on('listening', () =>
      console.log(`Feathers application started on ${app.get('host')}:${port}`)
    );
  });
