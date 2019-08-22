var express = require('express');
var router = express.Router();

//npm install socket.io --save
var http = require('http').createServer(function(res,req){}).listen(1005);
var io = require('socket.io').listen(http);

console.log('socket.io 서버 구동중...');
io.sockets.on('connection', function(socket){
	socket.on('init', function(data){ //클라이언트가 접속될때 호출
		socket.join(data.id); //사용자를 등록함.
		console.log(data.id+'접속함');
	});

	socket.on('publish', function(data){ //클라이언트로 부터 메시지가 왔을때 호출
		//모든 사용자에게 id와 msg값을 전송함.
		console.log(data.id + '로 부터 메시지 받음');
		io.sockets.emit('subscribe', {
			id : String(data.id),
			msg : String(data.msg)
		})
	});
})

module.exports = router;
