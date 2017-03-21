/**
 * 文件名：post
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/17
 * 修改内容：新增
 */
var express = require('express');
var userCheck = require('./check-login');
var Post = require('../models/post');
var router = express.Router();

router.post('/', userCheck.checkLogin);
router.post('/', function (req, res, next) {
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
    post.save(function (err) {
        if(err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发表成功');
        res.redirect('/u/' + currentUser.name);
    })
});

module.exports = router;