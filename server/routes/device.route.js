const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');
const { Device } = require('../models/device.model')

const Config = require('../config');

//Alan:取得
router.get('/', function (req, res, next) {
    Device.find()
        .populate('creator', 'firstName lastName')
        .deepPopulate('schedule.production.creator')
        .exec(function (err, devices) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: devices
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
    let decoded = jwt.decode(req.headers.authorization);

    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: '找不到帳號',
                error: err
            });
        }

        new Device({
            deviceId: req.body.deviceId,
            name: req.body.name,
            creator: user
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

        Device.findById(req.params.id, function (err, device) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!device) {
                return res.status(500).json({
                    title: 'No Device Found!',
                    error: { message: 'Device not found' }
                });
            }

            device.deviceId = req.body.deviceId;
            device.name = req.body.name;
            device.creator = user;

            device.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                //find once...to get the relationship
                Device.findOne(result)
                    .populate('creator', 'firstName lastName')
                    .deepPopulate('schedule.production.creator')
                    .exec(function (err, d) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        res.status(200).json({
                            message: 'Updated message',
                            obj: d
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
    Device.findOneAndRemove({ _id: req.params.id }, function (err, device) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Deleted Device',
                obj: device
            });
        }
    });
});

module.exports = router;