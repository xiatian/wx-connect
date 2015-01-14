/**
 * WXConnect
 * Copyright(c) 2014 tianxia <tianxia@tencent.com>
 * MIT Licensed
 */
var fs = require('fs');
var ejs = require('ejs');

// 消息模板
var messageTpl = fs.readFileSync(__dirname + '/message.ejs', 'utf-8');

/**
 * 消息、事件解析
 */
module.exports = function(req, res, next) {
  if (req.method !== 'POST' || req.headers['content-type'] !== 'text/xml') {
    // 非POST请求且请求头非xml的当作非法请求不予处理
    return res.end('Bad Request!');
  }

  // 解析请求体中的内容
  req.message = parseMessage(req.body);

  // 定义回复消息内容
  var reply = {
    toUserName: req.message.fromUserName,
    fromUserName: req.message.toUserName,
    createTime: new Date().getTime()
  };

  // 回复消息方法
  res.reply = function(data) {
    var output = ejs.render(messageTpl, extend(reply, data));
    res.end(output);
  };

  // 调试打印此次请求的内容
  res.debug = function() {
    console.log(req.message);
    res.reply({msgType: 'text', content: util.inspect(req.message)});
  };

  next();
};

/**
 * 将微信端发送的XML消息解析为JSON对象
 *
 * @param message
 * @returns {{}}
 */
function parseMessage(message) {
  var result = {};
  message.replace(/<xml>|<\/xml>/, '').replace(/<!\[CDATA\[(.*?)\]\]>/ig, '$1').replace(/<(\w+)>(.*?)<\/\1>/g, function (_, key, value) {
    key = key.replace(/(\w)/, function (str) { return str.toLowerCase();});
    result[key] = value;
  });

  return result;
}

/**
 * 类扩展工具函数
 *
 * @param obj
 * @param obj2
 * @returns {*}
 */
function extend(obj, obj2) {
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      obj[key] =obj2[key];
    }
  }

  return obj;
}