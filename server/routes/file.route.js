const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer')

const Config = require('../config');

//Alan:url must be absolute URL to avoide some url error
const DIR = path.join(__dirname, '/../uploads');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

var upload = multer({ storage: storage });

//Alan:取得
router.get('/:url', function (req, res, next) {
    // let path = DIR + "\\" + req.params.url;
    res.sendFile(DIR + "\\" + req.params.url);
});


router.use('/upload', function (req, res, next) {
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

router.post('/upload', function (req, res, next) {
    upload.array(Config.itemAlias)
        (req, res, function (err) {
            if (err) {
                console.log(err);
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
})

module.exports = router;