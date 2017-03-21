var express = require('express');
var User = require('../models/user');
var Post = require('../models/post');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    Post.get(null, function (err, posts) {
        if(err) {
            posts = [];
        }
        res.render('index', {
            title: 'Express',
            layout: 'template',
            posts: posts
        });
    });
});

router.get('/u/:user', function (req, res) {
    User.get(req.params.user, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');
        }
        Post.get(user.name, function (err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('user', {
                title: user.name,
                layout: 'template',
                posts: posts
            });
        });
    });
});

module.exports = router;
