const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {User} = require('../models/user.model');
const {Schedule} = require('../models/schedule.model');
const {Production} = require('../models/production.model');

const {Device} = require('../models/device.model');

const Config = require('../config');

//Alan:取得
router.get('/', function (req, res, next) {
    Schedule.find()
        .populate('creator', 'firstName lastName')
        .populate('production')
        .populate('device')
        .exec(function (err, schedules) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: schedules
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
    //Alan:找到建立人
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: '找不到帳號',
                error: err
            });
        }  //Alan:找到產品
        Production.findById(req.body.production, function (errPro, production) {
            if (errPro) {
                return res.status(500).json({
                    title: '找不到該產品',
                    error: err
                });
            }
            //Alan:找到設備
            Device.findById(req.body.device, function (errdevice, device) {
                if (errdevice) {
                    return res.status(500).json({
                        title: '找不到該設備',
                        error: errdevice
                    });
                }

                new Schedule({
                    scheduleDate: req.body.scheduleDate,
                    production: production,
                    device: device,
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
                        message: '設備排程成功',
                        obj: result
                    });
                });
            });
        });
    });
});

//Alan:search
router.post('/s', function (req, res, next) {

    let decoded = jwt.decode(req.headers.authorization);

    User.findById(decoded.user._id, function (errU, user) {
        if (errU) {
            return res.status(500).json({
                title: '找不到帳號',
                error: errU
            });
        }

        Schedule.find(req.body)
            .populate('creator', 'firstName lastName')
            .populate('production')
            .populate('device')
            .exec(function (err, schedule) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                if (!schedule) {
                    return res.status(500).json({
                        title: 'No Schedule Found!',
                        error: { message: 'Schedule not found' }
                    });
                }

                res.status(200).json({
                    message: 'Success',
                    obj: schedule
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

        Schedule.findById(req.params.id, function (err, schedule) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!schedule) {
                return res.status(500).json({
                    title: 'No Schedule Found!',
                    error: { message: 'Schedule not found' }
                });
            }
            //Alan:找到產品
            Production.findById(req.body.production, function (errPro, production) {
                if (errPro && production != null) {
                    return res.status(500).json({
                        title: '找不到該產品',
                        error: err
                    });
                }
                //Alan:找到設備
                Device.findById(req.body.device, function (errdevice, device) {
                    if (errdevice && device != null) {
                        return res.status(500).json({
                            title: '找不到該設備',
                            error: errdevice
                        });
                    }

                    schedule.scheduleDate = req.body.scheduleDate;
                    schedule.actionDate = req.body.actionDate;
                    schedule.finishDate = req.body.finishDate;
                    schedule.production = production;
                    schedule.device = device;
                    schedule.creator = user;
                    schedule.createData = req.body.createData;

                    schedule.save(function (err, result) {
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
    });
});

//Alan:刪除
router.delete('/:id', function (req, res, next) {
    Schedule.findOneAndRemove({ _id: req.params.id }, function (err, schedule) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Deleted schedule',
                obj: schedule
            });
        }
    });
});

module.exports = router;