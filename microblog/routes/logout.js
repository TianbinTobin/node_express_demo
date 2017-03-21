/**
 * 文件名：logout
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/17
 * 修改内容：新增
 */
var express = require('express');
var userCheck = require('./check-login');
var router = express.Router();

router.get('/', userCheck.checkLogin);
router.get('/', function (req, res, next) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect("/");
});

module.exports = router;