# logs_client

日志系统 [gavin66/logs](https://github.com/gavin66/logs) 的客户端程序



## 安装

* 浏览器环境,引入脚本 `logs_client.js`
```html
<script src="../dist/logs_client.js"></script>
```

* node 环境




## 使用

* 浏览器环境
```javascript
// 日志系统服务地址,必填
window.LogsClient.url = 'http://127.0.0.1:3000/logs';
// 队列最大长度,默认100
window.LogsClient.limit = 100;
// 检测队列间隔时间,最好不修改
window.LogsClient.delay = 0;

// 入队
window.LogsClient.queue.enqueue({
  table: "logs_table",
  data: '{"app":"app","name":"name"}'
});
```
* node 环境



