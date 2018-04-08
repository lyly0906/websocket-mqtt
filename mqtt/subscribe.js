var WebSocket = require('ws');
var mqtt = require('mqtt');  



var client2 = mqtt.connect("mqtt://192.168.2.117:1883");  
  
client2.on('connect', function () {
   console.log('>>> connected');
   client2.subscribe('v1/devices/me/telemetry',{qos:1});
})  

	  var ws = new WebSocket("ws://192.168.2.117:9998");
                ws.onmessage = function (evnt) {
					
					
					var obj = eval('(' + evnt.data + ')');
                    var strs = evnt.data.toString();
					if(obj.control == 1){
						var client = mqtt.connect('mqtt://192.168.2.117:1883');//连接到服务端
						var num = 0;
						var qtt = {
								"method": "setGpioStatus",
								"params": {}
							};//定义消息（可以为字符串，对象等）
						client.publish('v1/devices/me/rpc/request/+',JSON.stringify(qtt),{qos:1,retain:true});//hello mqtt + num++
					}
                };  
//client2.subscribe('v1/devices/me/telemetry',{qos:1});//订阅主题为test的消息  
  
client2.on('message',function(top,message) {  
    console.log(message.toString());  
	var data = JSON.parse(message.toString());
	  console.log(message.toString()); 
	  console.log(data.sd); 
	  msg = data;

	  var ws = new WebSocket("ws://192.168.2.117:9998");
                ws.onmessage = function (evnt) {
					
                    var strs = evnt.data.toString();
					console.log(strs);
                    if(strs.indexOf("logout") >= 0){
                        stopsocket();
                    }
					
					
					var obj = eval('(' + evnt.data + ')');
                    var strs = evnt.data.toString();
					if(obj.control == 1){
						var client = mqtt.connect('mqtt://192.168.2.117:1883');//连接到服务端
						var num = 0;
						var qtt = {
								"method": "setGpioStatus",
								"params": {}
							};//定义消息（可以为字符串，对象等）
						client.publish('v1/devices/me/rpc/request/+',JSON.stringify(qtt),{qos:1,retain:true});//hello mqtt + num++
					}
                };
                ws.onopen = function() {
                    if(ws.readyState == 1){
                        ws.send('{"name":"mqtt","msg":'+ message.toString() +'}');
                    }
                };
});  

