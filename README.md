# wx-connect

基于`Nodejs`及`connect`实现的微信公众平台接口开发框架，可用于快速构建微信公众平台接口应用。

```js
var wxConnect = require('wx-connect');
var app = wxConnect({appToken: ''})

app.text(function(req, res) {
  res.text('您好，欢迎使用微信公众平台！')
});

app.listen(80);
```

## 安装

```bash
$ npm install wx-connect
```

## 功能特性

 * 支持微信消息安全验证
 * 支持处理用户发送的文本消息
 * 支持处理用户发送的地理位置、自定义菜单点击、关注及取消关注事件
 * 支持回复文本、图文、语音、视频、音乐消息
 * 对消息和事件的处理采用中间件方式，结构清晰，扩展灵活
 * 代码简单，使用者只需关注业务逻辑，一切皆为JS
 * 充分利用NodeJS异步及事件特性，性能高效
  
 

## Test

```bash
$ npm install
$ npm test
```

## License

  [MIT](LICENSE)
