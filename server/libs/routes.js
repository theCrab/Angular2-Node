
const express = require('express');
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');

//Alan:routes!!!
const userRoutes = require('../routes/user.route');
const deviceRoutes = require('../routes/device.route');
const productionRoutes = require('../routes/production.route');
const scheduleRoutes = require('../routes/schedule.route');
const fileRoutes = require('../routes/file.route');
const menuRoutes = require('../routes/menu.route');


module.exports.connect = (app) => {
    app.use('/', express.static(__dirname + '/../dist'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    
    app.use('/user', userRoutes);
    app.use('/device', deviceRoutes);
    app.use('/production', productionRoutes);
    app.use('/schedule', scheduleRoutes);
    app.use('/file', fileRoutes);
    app.use('/menu', menuRoutes);
}