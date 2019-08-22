var express = require('express');
var router = express.Router();
//npm install mongodb --save
var MongoClient = require("mongodb").MongoClient;

//127.0.0.1:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//127.0.0.1:3000/itm/insert.js
router.get('/insert.js', function(req, res, next) {
  //insert.ejs를 표시하고, title에 "회원가입" 문자를 보냄.
  res.render('insert', { title: '물품등록'});
});


router.post('/insert.js', function(req, res, next) {
  var no = req.body.itm_no;  //값받기
  var name = req.body.itm_name; 
  var con = req.body.itm_con;
  var pri = req.body.itm_pri;
  var sto = req.body.itm_sto;

  var arr = {"no":no, "name":name, "con":con, "pri":pri, "sto":sto};

  console.log(arr);
  
  //서버 접속 정보
  var url = "mongodb://localhost:27017/test"; //test가 DB명

  MongoClient.connect(url, function(err, dbconn){
    if(err){
      console.log("오류1"+err);
    }
    else{
      //collection => 테이블과 같음
      var collection = dbconn.db("test").collection('item');
      collection.insertOne(arr).then(function(result) {
        console.log("insert mongodb ok"+result); 
        res.redirect('/itm/insert.js');
      }, function(err) {
        console.log("오류" + err);
        res.redirect('/itm/insert.js');
      });
    }
  });
  
  
});

module.exports = router;





/*

      /*
      collection.insertOne(arr1, function(err, result){
        if(err){
          console.log("오류" + err);
        }
        else{
          console.log("insert mongodb ok"); 
        } 
      });
 
  //DB에 추가
  var myinsertDocument = function(db, callback){
    var collection = db.collection('table1');
    collection.insertOne(arr1, function(err, result){
      if(err){
        console.log("오류" + err);
      }
      else{
        console.log("insert mongodb ok"); 
        callback(result);
      } 
    });
  }
  */