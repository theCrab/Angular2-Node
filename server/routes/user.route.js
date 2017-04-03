const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');

const Config = require('../config');

//Alan:註冊
router.post('/', function (req, res, next) {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

//Alan:signIn
router.post('/signin', function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: '登入失敗',
                error: { message: '不存在的帳號' }
            });
        }
        //Alan:加空白避免爆掉
        if (!bcrypt.compareSync(req.body.password + "", user.password)) {
            return res.status(401).json({
                title: '登入失敗',
                error: { message: '帳號或密碼錯誤，請重新填寫' }
            });
        }

        let option = {};
        if (req.body.remeberMe) {
            option = { expiresIn: Config.tokenExpiresIn }
        }

        //Alan:jwt設定，細節請看：https://jwt.io/   https://github.com/auth0/node-jsonwebtoken     
        let token = jwt.sign({ user: user }, Config.jwt_secret, option);
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});


//Alan:isLoggedIn
router.post('/isLoggedIn', function (req, res, next) {
    jwt.verify(req.headers.authorization, Config.jwt_secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        res.status(201).json({
            message: 'login Successfully',
            obj: true
        });

    })
});


module.exports = router;