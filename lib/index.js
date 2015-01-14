var http = require('http');
var util = require('util');
var connect = require('connect');
var bodyParser = require('body-parser');

var message = require('./message');
var signature = require('./signature');

module.exports = wxConnect;

function wxConnect(config) {
  var app = connect();
  app.use(bodyParser.text({type: 'text/xml'})); // 获取请求体内容
  app.use(message);
  app.use(signature(config));
  app.use(function(req, res, next) {
    if (req.message.msgType === 'text' && app.text) {
      return app.text.call(app, req, res, next);
    }
  });

  app.use(function(req, res, next) {
    res.end(util.inspect(req.message));
  });

  app.use(function(error, req, res, next) {
    res.end('ERR:' + error);
  });

  return app;
}

function router(req, res, next) {
  if (req.message.msgType === 'text' && app.text) {
    return app.text.call(app, req, res, next);
  }
}


