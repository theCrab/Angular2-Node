const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { User } = require('../models/user.model');
const { Production } = require('../models/production.model');
const { Schedule } = require('../models/schedule.model');
const { loginCheck } = require('../libs/loginCheck');

const Config = require('../config');

//Alan:取得
router.get('/', function (req, res, next) {
    Production.find()
        .populate('creator', 'firstName lastName')
        .deepPopulate('schedule.device.creator')
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

router.use('/', loginCheck);

//Alan:新增
router.post('/', function (req, res, next) {
    let decoded = jwt.decode(req.headers.authorization);

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
            requireDate: req.body.requireDate,
            creator: user,
            imageUrl: req.body.imageUrl
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

    let decoded = jwt.decode(req.headers.authorization);

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

            
            let fileUrl = Config.uploadUrl + decodeURI(production.imageUrl);
            //Alan:if there is change file, and img not equal defaule file, and old file is exit, then remove old file
            if (production.imageUrl != req.body.imageUrl
                && production.imageUrl != Config.defaultImageUrl
                && fs.existsSync(fileUrl)) {
                fs.unlinkSync(fileUrl);
            }

            production.imageUrl = req.body.imageUrl;

            production.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }

                //find once...to get the relationship
                Production.findOne(result)
                    .populate('creator', 'firstName lastName')
                    .deepPopulate('schedule.device.creator')
                    .exec(function (err, p) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        res.status(200).json({
                            message: 'Updated message',
                            obj: p
                        });
                    });
                // res.status(200).json({
                //     message: 'Updated message',
                //     obj: result
                // });
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
        }
        res.status(200).json({
            message: 'Deleted production',
            obj: production
        });
    });
});

module.exports = router;