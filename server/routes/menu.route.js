const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { loginCheck } = require('../libs/loginCheck');

const { Menu } = require('../models/menu.model');
const { User } = require('../models/user.model');

//Alan:取得
router.get('/', function (req, res, next) {
    Menu.find().sort({ 'sort': 1 })
        .exec(function (err, menus) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: menus
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

        new Menu({
            routerLink: req.body.routerLink,
            routerTitle: req.body.routerTitle,
            routerIcon: req.body.routerIcon,
            routerTitle_E: req.body.routerTitle_E,
            sort: req.body.sort,
            isLogin: req.body.isLogin,
            creator: user
        }).save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: '設備選單',
                obj: result
            });
        });
    });
});

// //Alan:修改
// router.patch('/:id', function (req, res, next) {

//     let decoded = jwt.decode(req.headers.authorization);

//     User.findById(decoded.user._id, function (errU, user) {
//         if (errU) {
//             return res.status(500).json({
//                 title: '找不到帳號',
//                 error: errU
//             });
//         }

//         Device.findById(req.params.id, function (err, device) {
//             if (err) {
//                 return res.status(500).json({
//                     title: 'An error occurred',
//                     error: err
//                 });
//             }
//             if (!device) {
//                 return res.status(500).json({
//                     title: 'No Device Found!',
//                     error: { message: 'Device not found' }
//                 });
//             }

//             device.deviceId = req.body.deviceId;
//             device.name = req.body.name;
//             device.creator = user;

//             let fileUrl = Config.uploadUrl + decodeURI(device.imageUrl);
//             //Alan:if there is change file, and img not equal defaule file, and old file is exit, then remove old file
//             if (device.imageUrl != req.body.imageUrl
//                 && device.imageUrl != Config.defaultImageUrl
//                 && fs.existsSync(fileUrl)) {
//                 fs.unlinkSync(fileUrl);
//             }

//             device.imageUrl = req.body.imageUrl;

//             device.save(function (err, result) {
//                 if (err) {
//                     return res.status(500).json({
//                         title: 'An error occurred',
//                         error: err
//                     });
//                 }
//                 //find once...to get the relationship
//                 Device.findOne(result)
//                     .populate('creator', 'firstName lastName')
//                     .deepPopulate('schedule.production.creator')
//                     .exec(function (err, d) {
//                         if (err) {
//                             return res.status(500).json({
//                                 title: 'An error occurred',
//                                 error: err
//                             });
//                         }
//                         res.status(200).json({
//                             message: 'Updated message',
//                             obj: d
//                         });
//                     });

//                 // res.status(200).json({
//                 //     message: 'Updated message',
//                 //     obj: result
//                 // });
//             });
//         });
//     });
// });

// //Alan:刪除
// router.delete('/:id', function (req, res, next) {
//     Device.findOneAndRemove({ _id: req.params.id }, function (err, device) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         } else {
//             res.status(200).json({
//                 message: 'Deleted Device',
//                 obj: device
//             });
//         }
//     });
// });

module.exports = router;