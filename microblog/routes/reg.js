/**
 * 文件名：reg
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

router.get('/', userCheck.checkNotLogin);
router.get('/', function (req, res, next) {
    res.render('reg',{ title: '注册', layout: 'template' });
});

router.post('/', userCheck.checkNotLogin);
router.post('/', function (req, res, next) {
    if(req.body['password-repeat'] !== req.body['password']){
        req.flash('error','两次输入密码不一致');
        return res.redirect('/reg');
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password
    });
    //检查用户名是否已经存在
    User.get(newUser.name, function(err, user) {
        if (user)
            err = 'Username already exists.';
        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //如果不存在则新增用户
        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', '注册成功');
            res.redirect('/');
        });
    });
});

module.exports = router;