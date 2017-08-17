/**
 * Created by Anshi on 2017/8/11.
 */
const net = require('net');
var readline = require('readline');
//创建readline接口实例
var  rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let client = net.createConnection(8090, '69.171.76.12', (s) => {
// let client = net.createConnection(8090, 'localhost', (s) => {
  console.log("client connect")
});
client.on('data', (data) => {
  console.log("server:"+data.toString());
});
rl.on('line', (input) => {
  client.write(input)
});
process.on('uncaughtException', function (err) {
  console.log(err);
});



client.on('error', (err) => {
  console.log(err);
});