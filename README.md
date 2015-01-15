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



## License

[MIT](LICENSE)
