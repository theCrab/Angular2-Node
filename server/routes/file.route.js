const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const multer = require('multer')

const Config = require('../config');

//Alan:url must be absolute URL to avoide some url error

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(Config.uploadUrl, 'tmp'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

var upload = multer({ storage: storage });

//Alan:取得
router.get('/:url', function (req, res, next) {
    // let path = DIR + "\\" + req.params.url;
    res.sendFile(Config.uploadUrl + req.params.url);
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
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            if (!fs.existsSync(Config.uploadUrl + req.body.toUrl)) {
                fs.mkdirSync(Config.uploadUrl + req.body.toUrl);
            }

            let files = req.files.map((file) => {
                let targetUrl = path.join(req.body.toUrl, file.filename);
                fs.renameSync(file.path, path.join(Config.uploadUrl, targetUrl));
                file.path = encodeURI(targetUrl);

                return file;
            });

            res.status(200).json({
                message: 'files upload success',
                obj: files
            });
        })
})

module.exports = router;