var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.2.117:1883');//连接到服务端
var num = 0;
var qtt = {
        "method": "setGpioStatus",
        "params": {}
    };//定义消息（可以为字符串，对象等）
//qtt.aa = 'method:setGpioStatus';
//qtt.bb = '消息！';

//etInterval(function() {
	//发布主题为Test的消息
	client.publish('v1/devices/me/rpc/request/+',JSON.stringify(qtt),{qos:1,retain:true});//hello mqtt + num++
//},2000);