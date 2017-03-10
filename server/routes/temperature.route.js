var express = require('express');
var router = express.Router();

var fs = require('fs');
var http = require('http');
var https = require('https');

var Temperature = require('../models/temperature.model')

var Config = require('../config');

//Alan:取得
router.get('/', function (req, res, next) {
    Temperature.find()
        .exec(function (err, temperature) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Get Saved Temperature',
                obj: temperature
            });
        });
});

//Alan:取得warm的資料
router.get('/warm', function (req, res, next) {
    Temperature.find({ temperature: { $gt: 30 } })
        .exec(function (err, temperature) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Get warm Temperature',
                obj: temperature
            });
        });
});

//Alan:新增
router.post('/', function (req, res, next) {
    var temperature = new Temperature({
        content: req.body.content
    });
    temperature.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Temperature',
            obj: result
        });
    });
});

router.get('/load', function (req, res) {
    downloadFile("http://192.168.10.150/PRData.txt", __dirname + "/../file/PRData.txt", function (state, url) {
        //Alan:如果有找到
        if (state) {
            fs.readFile(url, 'utf8', function (err, file) {
                if (err) return console.error(err);

                const temp = file.split('\u00A1');

                // res.status(200).json({
                //     // deviceId:temp[0],
                //     deviceId: 'Device A',
                //     temperature: temp[5],
                //     time: new Date().toLocaleString().substring(11)
                // });
                var type = null;

                if (temp[5] > 30) {
                    type = "warm";
                }

                var temperature = new Temperature({
                    deviceId: 'Device A',
                    temperature: temp[5],
                    time: new Date(),
                    type: type
                });

                temperature.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    res.status(201).json({
                        message: 'Saved Temperature',
                        obj: result
                    });
                });

            });
        } else {
            res.status(500).json({
                title: '錯誤',
                error:  url
            });
        }
    });
});

function downloadFile(url, localFile, callback) {

    fs.stat(url, function (err, stat) {
        if (err == null) {
            if (stat.isDirectory()) {
                console.log('文件夹存在');
            } else if (stat.isFile()) {
                console.log('文件存在');
                var httpClient = url.slice(0, 5) === 'https' ? https : http;
                var writer = fs.createWriteStream(localFile);
                writer.on('finish', function () {
                    callback(true, localFile);
                });
                httpClient.get(url, function (response) {
                    response.pipe(writer);
                });
            } else {
                console.log('路径存在，但既不是文件，也不是文件夹');
                //输出路径对象信息
                console.log(stat);
            }
        } else if (err.code == 'ENOENT') {
            console.log(err.name);
            console.log('路径不存在');
            callback(false, '路徑不存在');
        } else {
            console.log('错误：' + err);
        }
    });
}

module.exports = router;