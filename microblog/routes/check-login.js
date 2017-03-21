/**
 * 文件名：check-login
 * 描述：
 * 修改人： tianbin
 * 修改时间：2017/3/21
 * 修改内容：新增
 */
module.exports = {
    checkLogin: function (req, res ,next) {
        if(!req.session.user){
            req.flash('error', '未登录');
            return res.redirect('/login');
        }
        next();
    },
    checkNotLogin: function (req, res, next) {
        if(req.session.user) {
            req.flash('error', '已登入');
            return res.redirect('/');
        }
        next();
    }
};