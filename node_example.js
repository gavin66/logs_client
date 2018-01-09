const LogsClient = require('./node/logs_client');

LogsClient.url = 'http://127.0.0.1:3000/test';
LogsClient.concurrency = 1;
const queue = LogsClient.queue();

queue.push({
  table:'logs_table',
  data: '{"a":"b","c":"d"}'
});