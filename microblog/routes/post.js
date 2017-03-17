/**
 * 文件名：post
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/17
 * 修改内容：新增
 */
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    console.log(11);
    res.send("post");
});

module.exports = router;