var express = require('express');
var partials = require('express-partials');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var settings = require('./setting');
var routes = require('./routes/routes');
var fs = require('fs');

var app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
var errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), {flags: 'a'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        host: settings.host,
        port: 27017,
        db: settings.db,
        url: "mongodb://localhost:27017/microblog"
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('combined', {stream: accessLogStream}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLogStream.write(meta + err.stack + '\n');
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
