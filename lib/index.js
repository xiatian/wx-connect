/**
 * WXConnect
 * Copyright(c) 2014 tianxia <tianxia@tencent.com>
 * MIT Licensed
 */

var util = require('util');
var connect = require('connect');
var bodyParser = require('body-parser');

var message = require('./message');
var signature = require('./signature');

module.exports = wxConnect;

/**
 * wxConnect，基于connect实现对微信消息事件处理的简单封装
 *
 * @param config
 * @returns {*|exports}
 */
function wxConnect(config) {
  var app = connect();
  app.use(bodyParser.text({type: 'text/xml'})); // 获取请求体内容
  app.use(signature(config)); // 验证接受来自微信端发送的消息真实性
  app.use(message); // 解析微信端发送的XML消息

  // 分派消息处理
  app.use(function(req, res, next) {
    // 分派文本消息处理
    if (req.message.msgType == 'text' && app.text) {
      return app.text.call(app, req, res, next);
    }

    // 分派地理位置上报事件处理
    if (req.message.msgType == 'event' && req.message.event == 'LOCATION' && app.location) {
      return app.location.call(app, req, res, next);
    }

    // 分派自定义菜单点击事件处理
    if (req.message.msgType == 'event' && req.message.event == 'CLICK' && app.menu) {
      return app.menu.call(app, req, res, next);
    }

    // 分派用户关注事件处理
    if (req.message.msgType == 'event' && req.message.event == 'subscribe' && app.subscribe) {
      return app.subscribe.call(app, req, res, next);
    }

    // 分派用户取消关注事件处理
    if (req.message.msgType == 'event' && req.message.event == 'unsubscribe' && app.unsubscribe) {
      return app.unsubscribe.call(app, req, res, next);
    }
  });

  // 默认消息处理，在消息/事件没有被分派时调用
  app.use(function(req, res) {
    res.end(util.inspect(req.message));
  });

  // 错误处理
  app.use(function(error, req, res) {
    console.log(error);
    res.end(error.toString());
  });

  return app;
}


