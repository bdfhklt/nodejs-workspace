var express = require('express');
var router = express.Router();

//npm install mosca --save  <= MQTT nodejs용 설치
var mosca = require('mosca');

//포트번호설정 : 1883 앱용, 1884 웹용
var settings = { 
    port: 1883,
    http:{
        port:1884,
        bundle : true,
        static:'./'
    }
}

var server = new mosca.Server(settings);

server.on('clientConnected', function(client){
    console.log('클라이언트 접속함', client.id);
});

server.on('clientDisconnected', function(client){
    console.log('클라이언트 접속종료함' + client.id);
})

server.on('publish', function(packet, client){
    console.log('클라이언트에서 메시지가 옴');

    //0~2
    var message = {
        topic : packet.topic,
        payload : packet.payload,
        qos : 0,
        retain:false
    };
    
    server.publish(message, function(){
        console.log('클라이언트로 메시지를 보냄');
    });
});

server.on('ready', function(){
    console.log('mosca broker 시작됨...');
})

module.exports = router;