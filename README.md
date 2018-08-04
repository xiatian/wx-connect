# wx-connect

基于`Nodejs`及`connect`实现的微信公众平台接口开发框架，可用于快速构建微信公众平台接口应用。

```js
var wxConnect = require('wx-connect');
var app = wxConnect({appToken: ''})

app.text = function(req, res) {
  res.text('您好，欢迎使用微信公众平台！')
};

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
 * 充分利用`NodeJS`异步及事件特性，性能高效
  
## 快速开始

安装后在项目目录下新建 `app.js` 文件：

### 加载依赖

```js
var wxConnect = require('wx-connect');
```
### 配置信息

其中`appToken`需和微信开发者模式中设置的`token`保持一致，其余2个参数是微信获取accsess_token时用，可忽略

```js
var config = {
  appID: 'wxd59a79ed8e3fab89',
  appSecret: '',
  appToken: 'WXConnect'
};
```

### 实例化应用

```js
var app = wxConnect(config);
```

###文本消息处理

`app.text` 定义接受用户在微信端输入的文本消息处理

```js
app.text = function(req, res, next) {
  res.text('您输入的内容：' + req.message.content); // 返回用户其输入的内容
};
```

`function(req, res, next) {}`在`connect`和`express`框架中叫做中间件，是一个带3个参数的回调函数

`req`和`res`源自`http.createServer(function(res, req){})`里的`req`和`res`，`wx-connect`对其进行了简单的扩展

`req`里面包含了用户的请求信息，`res.message`包含了用户从微信端发送的消息或事件内容

`res`用于向用户返回响应，`res.reply()`方法用于返回格式化的消息给微信端用户，`res.text()`和`res.news()`方法用于向用户回复文本和图文消息，`res.debug()`用于打印调试信息，当不知道用户端发送的消息内容时使用

`req.message`包含的消息内容如下：

```js
req.message = {
	fromUserName: 'xxoo', // 发送消息的用户微信OpenID
	toUserName: 'xxoo', // 接受消息的公众号OpenID
	msgType: 'text', // 消息类型 text：文本，event：事件
	content: 'abc', // 文本消息内容
	event: 'click', // 事件类型 click：自定义菜单点击，LOCATION：地理位置上报，subscribe：关注，unsubscribe：取消关注
	eventKey: 'USER_KEY' // 自定义菜单点击事件KEY
}
```

`res.news([..])`图文消息参数格式：

```js
res.news([{title: '标题', description: '描述', picUrl: '图片URL', url: '跳转链接'}...])
```

可参照[微信公众平台开发者文档](http://mp.weixin.qq.com/wiki/14/89b871b5466b19b3efa4ada8e577d45e.html)中的回复消息格式，不同之处是键名第一个字母改为小写

### 地理位置上报事件处理

```js
app.location ＝ function(req, res, next) {}
```

### 定义菜单点击事件处理

```js
app.menu ＝ function(req, res, next) {}
```

### 用户关注事件处理

```js
app.subscribe ＝ function(req, res, next) {}
```

### 用户取消关注事件处理

```js
app.unsubscribe ＝ function(req, res, next) {}
```

### 启动应用

```js
// 启动server
app.listen(80, function() {
  console.log('Server is running on 80'); // 注意：微信公众号接口只支持80端口
});
```

## 演示案例

[WXWeather](https://github.com/xiatian/WXWeather) 使用 `wx-connect` 开发微信公众平台接口，实现了一个天气查询功能的微信公众号。

## 相关文档

* [NodeJS](http://www.nodejs.org/)
* [connect](https://github.com/senchalabs/connect)
* [微信公众平台开发者文档](http://mp.weixin.qq.com/wiki/home/index.html)

## 微信公众平台测试号申请

微信为没有申请公众号又想体验公众平台接口开发的同学提供了测试号申请，直接体验和测试公众平台所有高级接口。

申请地址：<http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login>

## Test

```bash
$ npm test
```

## 联系

有任何疑问可以加入QQ群讨论，群号：184191092

## License

[MIT](LICENSE)
