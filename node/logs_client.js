const request = require('request');
const async = require('async');

const LogsClient = {
  url: '',
  concurrency: 100,
  queue: function () {
    // console.log('初始化队列',this.url,this.concurrency);
    return async.queue(function(task, callback) {
      // console.log('执行一个任务',task);
      request.post(LogsClient.url,{form:{table:task.table,data:task.data}},(error, response, body) =>{
        // console.log(body);
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        // 继续执行下面队列
        callback();
      });
    }, LogsClient.concurrency)
  }
};


// // 如果某次push操作后，任务数将达到或超过worker数量时，将调用该函数
// queue.saturated = function() {
//   log('all workers to be used');
// }
//
// // 当最后一个任务交给worker时，将调用该函数
// queue.empty = function() {
//   log('no more tasks wating');
// }
//
// // 当所有任务都执行完以后，将调用该函数
// queue.drain = function() {
//   console.log('all tasks have been processed');
// }

module.exports = LogsClient;