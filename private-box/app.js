const express = require("express"),
  path = require("path"),
  //favicon = require('serve-favicon'),
  logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  routes = require("./routes"),
  app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);


//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

var identityKey = 'a123456ab';

app.use(session({
  name: 'safe_session',
  secret: identityKey, // 用来对session id相关的cookie进行签名
  store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10 * 1000 // 有效期，单位是毫秒
  }
}));

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
