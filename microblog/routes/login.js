/**
 * 文件名：login
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/17
 * 修改内容：新增
 */
var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var userCheck = require('./check-login');
var router = express.Router();

router.get('/',userCheck.checkNotLogin);
router.get('/', function (req, res, next) {
    res.render('login',{
        title: '用户登入',
        layout: 'template'
    })
});

router.post('/',userCheck.checkNotLogin);
router.post('/', function (req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function (err, user) {
        if(!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if(user.password !== password) {
            req.flash('error', '密码错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect("/");
    });
});

module.exports = router;