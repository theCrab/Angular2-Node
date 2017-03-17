var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user.model');
var Production = require('../models/production.model');

var Config = require('../config');

//Alan:取得
router.get('/', function (req, res, next) {
    Production.find()
        .populate('creator', 'firstName lastName')
        .exec(function (err, productions) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: productions
            });
        });
});

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

//Alan:新增
router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: '找不到帳號',
                error: err
            });
        }

        new Production({
            name: req.body.name,
            count: req.body.count,
            requireDate:req.body.requireDate,
            creator: user,
            createData: new Date()
        }).save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: '設備新增成功',
                obj: result
            });
        });
    });
});

//Alan:修改
router.patch('/:id', function (req, res, next) {

    var decoded = jwt.decode(req.headers.authorization);

    User.findById(decoded.user._id, function (errU, user) {
        if (errU) {
            return res.status(500).json({
                title: '找不到帳號',
                error: errU
            });
        }

        Production.findById(req.params.id, function (err, production) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!production) {
                return res.status(500).json({
                    title: 'No Production Found!',
                    error: { message: 'Production not found' }
                });
            }

            production.name = req.body.name;
            production.count = req.body.count;
            production.requireDate = req.body.requireDate;
            production.creator = user;
            production.createData = new Date();

            production.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Updated message',
                    obj: result
                });
            });
        });
    });
});

//Alan:刪除
router.delete('/:id', function (req, res, next) {
    Production.findOneAndRemove({ _id: req.params.id }, function (err, production) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Deleted production',
                obj: production
            });
        }
    });
});

module.exports = router;