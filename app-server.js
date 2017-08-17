/**
 * Created by Anshi on 2017/8/11.
 */

console.log(process.env)

const net = require('net');


const Manager = require('./clientManager');

class Chat {
  constructor(port) {
	this.server = new net.Server();
	this.port = port;
	this.clientManger = new Manager();
	this.host = '69.171.76.12'

	this.server.on('error', this.errCb);
	console.log(this.port);
	this.server.listen(this.port, this.host, this.listenCb);
	this.exec();
  }

  exec() {
	let _this = this;
	this.server.on('connection', (c) => {
	  //c好像是个socket实例

	  _this.clientManger.addClient(c);
	  c.on('end', () => {
		_this.clientManger.reduceClient(c);
	  });

	  c.on('data', (data) => {
		//data是buffer
		_this.clientManger.writeToClients(`${c.$anshi_id}:${data}`)
	  });
	  console.log("建立一条连接")
	})
  }

  errCb(err) {
	console.log(err)
	throw  err;
  }

  listenCb() {
	console.log(this);
	console.log('server bound 监听端口数为' + this.port)
  }
}


let chat1 = new Chat(8090);


