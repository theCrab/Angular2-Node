global.Promise = require('bluebird');

const express = require('express');
const path = require('path');
const morgan = require('morgan'); // logger
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const database = require('./libs/database');
database.connect();

const app = express();
const port = 3000;

app.set('port', (process.env.PORT || port));
app.use('/', express.static(__dirname + '/../dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//Alan:routes!!!
const userRoutes = require('./routes/user.route');
const deviceRoutes = require('./routes/device.route');
const productionRoutes = require('./routes/production.route');
const scheduleRoutes = require('./routes/schedule.route');
const fileRoutes = require('./routes/file.route');

app.use('/user', userRoutes);
app.use('/device', deviceRoutes);
app.use('/production', productionRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/file',fileRoutes);

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