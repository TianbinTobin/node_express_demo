/**
 * 文件名：db.js
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/18
 * 修改内容：新增
 */
var settings = require('../setting');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port, {}), {safe: true});