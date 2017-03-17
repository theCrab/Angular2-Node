var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var port = 3000;
var db = 'mongodb://localhost:27017/test';

mongoose.connect(db);

app.set('port', (process.env.PORT || port));
app.use('/', express.static(__dirname + '/../dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

//Alan:routes!!!
var userRoutes = require('./routes/user.route');
var temperatureRoutes = require('./routes/temperature.route');
var deviceRoutes = require('./routes/device.route');
var productionRoutes = require('./routes/production.route');
var scheduleRoutes = require('./routes/schedule.route');

app.use('/user', userRoutes);
app.use('/temperature', temperatureRoutes);
app.use('/device', deviceRoutes);
app.use('/production', productionRoutes);
app.use('/schedule', scheduleRoutes);

// all other routes are handled by Angular
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// all other routes are handled by Angular
app.get('/tesssss', function (req, res) {
  res.send('tesss!!ss');
});

app.listen(app.get('port'), function () {
  console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
});

module.exports = app;