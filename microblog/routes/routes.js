/**
 * 文件名：routes.js
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/21
 * 修改内容：新增
 */

var index = require('./index');
var users = require('./users');
var time = require('./time');
var post = require('./post');
var reg = require('./reg');
var login = require('./login');
var logout = require('./logout');

module.exports = function (app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/time', time);
    app.use('/post', post);
    app.use('/reg', reg);
    app.use('/login', login);
    app.use('/logout', logout);
};