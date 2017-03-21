/**
 * 文件名：post.js
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/21
 * 修改内容：新增
 */
var mongodb = require('./db');

var Post = function (user, post, time) {
    this.user = user;
    this.post = post;
    this.time = time ? time : new Date();
};
module.exports = Post;

Post.prototype.save = function (callback) {

    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    };
    mongodb.open(function (err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('user');
            collection.insert(post, {safe:true}, function (err, post) {
                mongodb.close();
                callback(err, post);
            });
        });
    });
};

Post.get = function (username, callback) {

    mongodb.open(function (err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }

            // 查找 user 属性为 username 的文档，如果 username 是 null 则匹配全部
            var query = {};
            if(username) {
                query.user = username;
            }
            collection.find(query).sort({time: -1}).toArray(function (err, docs) {
                mongodb.close();
                if(err) {
                    callback(err, null);
                }
                // 封装 posts 为 Post 对象
                var posts = [];
                docs.forEach(function (doc, index) {
                    var post = new Post(doc.user, doc.post, doc.time);
                    posts.push(post);
                });
                callback(null, posts);
            });
        });
    });
};