global.Promise = require('bluebird');

const express = require('express');
const path = require('path');

const database = require('./libs/database');
database.connect();

const app = express();
const port = 3000;

app.set('port', (process.env.PORT || port));

const routes = require('./libs/routes');
routes.connect(app);

// all other routes are handled by Angular
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// all other routes are handled by Angular
// app.get('/tesssss', function (req, res) {
//   res.send('tesss!!ss');
// });

app.listen(app.get('port'), function () {
  console.log('WWS is ready to connect on port : ' + app.get('port'));
});

module.exports = app;