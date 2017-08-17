/**
 * Created by Anshi on 2017/8/11.
 */
const EventEmitter = require('events');

module.exports = class Client {
  constructor() {
	this.event = new EventEmitter();
	this.clients = {};
	this.exec();
  }

  exec() {
	let _this = this;
	this.event.on('addClient', client => {
	  //用户数增加了。当前聊天室人数为。
	  _this.writeToClients(`${client.$anshi_id}进入了房间，当前人数为${Object.keys(_this.clients).length}`)
	})

	this.event.on('reduceClient', client => {
	  //用户数减少了。当前聊天室人数为。
	  _this.writeToClients(`${client.$anshi_id}离开了房间，当前人数为${Object.keys(_this.clients).length}`)
	})
  }

  writeToClients(data) {
    console.log(data)
	Object.keys(this.clients).forEach(item => {
	  this.clients[item].write(data);
	})
  }

  addClient(client) {
    client.$anshi_id=`${client.remoteAddress}:${client.remotePort}`;
	this.clients[client.$anshi_id] = client;
	this.event.emit('addClient', client)
  }

  reduceClient(client) {
	delete this.clients[client.$anshi_id]
	this.event.emit('reduceClient', client)
  }
}