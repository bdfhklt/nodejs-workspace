var express = require('express');
var router = express.Router();

//라이브러리 import
//npm install oralcedb --save
var oracledb = require('oracledb');
oracledb.autoCommit = true;

//127.0.0.1:3000/0
// router.get('/0', function(req, res, next){
// 	res.render('board');
// });
router.get('/0', function(req, res, next) {
    var data = [{id:'i1', age:15}, {id:'i2', age:25}];
    
    console.log(data);
    res.json(data);
    res.end();
});

//127.0.0.1:3000/1
router.post('/1', function(req, res, next){
	oracledb.getConnection({
		user : "myword", // 데이터 베이스 접속 정보
		password:"123456",
		connectString : "1.234.5.158:1527/xe"
	}, function(err, conn){
		if(err){
			console.log('DB오류' + err);
		}
		else{
			var sql = req.body.sql; // 받아온 sql문
			conn.execute(sql, function(err, result){ // 데이터베이스 상호작용
				if(err){
					console.log("SQL오류"+err);
				}
				else{
					console.log(result);
					res.json(result); // 데이터 전송
					res.end();
				}
			});
		}
	});
	
});

//127.0.0.1:3000/11
router.get('/11', function(req, res, next){ // 사용안함
	oracledb.getConnection({
		user : "system",
		password:"123456",
		connectString : "127.0.0.1:1521/xe"
	}, function(err, conn){
		if(err){
			console.log('DB오류' + err);
		}
		else{
			var sql = "SELECT * FROM QUIZCARD"; // 데이터베이스 출력
			conn.execute(sql, function(err, result){
				if(err){
					console.log("SQL오류"+err);
				}
				else{
					console.log(result.rows);
					res.json(result.rows); // 데이터 전송
					res.end();
				}
			});
		}
	});
	
});

//127.0.0.1:3000/2
router.post('/2', function(req, res, next){ // 사용안함
	console.log(req.body);
	oracledb.getConnection({
		user : "system",
		password:"123456",
		connectString : "127.0.0.1:1521/xe"
	}, function(err, conn){
		if(err){
			console.log('DB오류' + err);
		}
		else{
			//var sql = "INSERT INTO QUIZCARD VALUES(1, 2, 3, 4, 5)"; // 데이터베이스 입력
			//conn.execute(sql);
			res.end();
		}
	});
	
});


//127.0.0.1:3000/22
router.get('/22', function(req, res, next){ // 사용안함
	oracledb.getConnection({
		user : "system",
		password:"123456",
		connectString : "127.0.0.1:1521/xe"
	}, function(err, conn){
		if(err){
			console.log('DB오류' + err);
		}
		else{
			var sql = "INSERT INTO QUIZCARD VALUES(1, 2, 3, 4, 5)"; // 데이터베이스 입력
			conn.execute(sql);
			res.end();
		}
	});
	
});

module.exports = router;
