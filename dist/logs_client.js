// 日志系统客户端 命名空间
window.LogsClient = {
  url: '',
  limit: 100,
  delay: 0
};

/**
 * 限制长度的队列实现
 *
 * @constructor
 */
window.LogsClient.LimitQueue = function (limit) {
  // 队列长度
  var limit = limit;

  //初始化队列（使用数组实现）
  var items = [];

  // 向队列（尾部）中插入元素
  this.enqueue = function (element) {
    // 如果队列长度已达最大,删除头部一个
    this.size() >= limit && this.dequeue();
    items.push(element);
  };

  //从队列（头部）中弹出一个元素，并返回该元素
  this.dequeue = function () {
    return items.shift();
  };

  //查看队列最前面的元素（数组中索引为0的元素）
  this.front = function () {
    return items[0];
  };

  //查看队列是否为空，如果为空，返回true；否则返回false
  this.isEmpty = function () {
    return items.length === 0;
  };

  //查看队列的长度
  this.size = function () {
    return items.length;
  };

  //查看队列
  this.print = function () {
    //以字符串形势返回
    return JSON.stringify(items);
  };
};

/**
 * 封装 ajax
 * @param options
 */
window.LogsClient.ajax = function (options) {
  if (!options.url) {
    return false;
  }
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";

  // 格式化参数
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
  }

  var params = formatParams(options.data);

  //创建 - 非IE6 - 第一步
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else { //IE6及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  //接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };

  //连接 和 发送 - 第二步
  if (options.type === "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open("POST", options.url, true);
    //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }
};

// 初始化一个日志队列
window.LogsClient.queue = new window.LogsClient.LimitQueue(window.LogsClient.limit);

// 循环执行,队列长度大于 0 执行 ajax 请求
setInterval(function () {
  window.LogsClient.queue.size() && window.LogsClient.ajax({
    url: window.LogsClient.url,
    type: "POST",
    data: window.LogsClient.queue.dequeue(),
    dataType: "json",
    success: function (response, xml) {
      // 此处放成功后执行的代码
      console.log(response)
    },
    fail: function (status) {
      // 此处放失败后执行的代码
      console.log('fail', status)
    }
  });
}, 0);