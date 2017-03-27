const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer')

const fs = require('fs');
const upload = multer({ dest: __dirname + '/server/upload/' });



const Config = require('../config');

router.use('/', function (req, res, next) {
    jwt.verify(req.headers.authorization, Config.jwt_secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});


router.post('/upload', upload.array('logo', 2), function (req, res, next) {
    res.send({ ret_code: '0' });
});

module.exports = router;