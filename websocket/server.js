var WebSocketServer = require('ws').Server,  
    wss = new WebSocketServer({  
        port: 9998, //监听接口  
        verifyClient: socketVerify //可选，验证连接函数  
    });  
  
function socketVerify(info) {  
    //console.log(info.origin);  
    //console.log(info.req.t);  
    //console.log(info.secure);  
    // console.log(info.origin);  
    // var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);  
    //if (origin.length >= 3 && origin[2] == "blog.luojia.me") {  
    //    return true; //如果是来自blog.luojia.me的连接，就接受  
    //}  
    // console.log("连接",origin[2]);  
    return true; //否则拒绝  
    //传入的info参数会包括这个连接的很多信息，你可以在此处使用console.log(info)来查看和选择如何验证连接  
}  
//广播  
wss.broadcast = function broadcast(s,ws) {  
    // console.log(ws);  
    // debugger;  
    wss.clients.forEach(function each(client) {  
        // if (typeof client.user != "undefined") {  
            if(s == 1){  
			    
				var json_data = JSON.stringify(ws.msg); 
				console.log(json_data);
				console.log(typeof json_data);
                client.send('{"' + ws.name + '":' + json_data + '}');  
            }  
            if(s == 0){  
                client.send(ws + "退出聊天室");    
            }  
        // }  
    });  
};  
// 初始化  
wss.on('connection', function(ws) {  
    // console.log("在线人数", wss.clients.length);  
    //ws.send('你是第' + wss.clients.length + '位');  
    // 发送消息  
    ws.on('message', function(jsonStr,flags) { 
		//console.log(typeof jsonStr); 
		var obj = eval('(' + jsonStr + ')');
		console.log(typeof obj);
		if(typeof obj == "object" && typeof obj != "undefined"){
			wss.broadcast(1,obj); 
		}else{		  
			var tempStr = '{"name":"control","msg":"1"}';
			var obj = eval('(' + tempStr + ')');
			console.log(obj);
			wss.broadcast(1,obj); 
        //console.log(obj);  
		}
		//console.log(obj); 
           
    });  
    // 退出聊天  
    ws.on('close', function(close) {  
        try{  
            wss.broadcast(0,this.user.name);  
        }catch(e){  
            console.log('刷新页面了');  
        }  
    });  
}); 