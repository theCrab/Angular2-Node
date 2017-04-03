const jwt = require('jsonwebtoken');

const Config = require('../config');

module.exports.loginCheck = (req, res, next) => {
    jwt.verify(req.headers.authorization, Config.jwt_secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
}