var mosca = require('mosca');//构建服务器
/*var settings = {
	port:8989,
	backend:{
		type:'zmq',
		json:false,
		zmq:require("zmq"),
		port:"tcp://127.0.0.1:33334",
		controlPort:"tcp://127.0.0.1:33334",
		delay:5
	},
	persistence: {
		factory:mosca.persistence.Mongo,
		url:"mongodb://localhost:270117/mosca"
	}
};
var MqttServer = new mosca.Server(settings);*/
var MqttServer = new mosca.Server({
	port:1883
});

//监听链接
MqttServer.on("clientConnected",function(client) {
	console.log("client connected",client.id);
});
//监听mqtt的主题消息
MqttServer.on("published",function(packet,client) {//当客户端有连接的时候，发布主题消息
	var topic = packet.topic;
	console.log(packet);
	switch(topic) {
		case 'test':
			console.log("message-publish",packet.payload.toString());
			//mqtt转发主题消息
			MqttServer.publish({topic:'other',payload:'这是服务端！'});
			break;
		case 'test2':
			console.log("payload:",packet.payload.toString());
			var msg = {
				topic:'repeat',
				payload:packet.payload,
				qos:0,
				retain:false
			};
			MqttServer.publish(msg,function() {
				console.log('repeat!   ');
			});
			break;
		case 'other':
			console.log("case-other:",packet.payload.toString());
			break;
	}
});
MqttServer.on('ready',function() {
	console.log("mqtt is running....");
});