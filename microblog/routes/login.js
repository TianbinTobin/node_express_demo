/**
 * 文件名：login
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/17
 * 修改内容：新增
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('login');
});

router.post('/', function (req, res, next) {
    res.send('login');
});

module.exports = router;