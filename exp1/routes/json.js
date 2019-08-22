var express = require('express');
var router = express.Router();

//127.0.0.1:3000/json/ex1.json
router.get('/ex1.json', function(req, res, next) {
  res.json({id:'abc', age:15});
  res.end();
});

//127.0.0.1:3000/json/ex2.json
router.get('/ex2.json', function(req, res, next) {
    var data  = [{id:'abc', age:15},{id:'def', age:25},{id:'efg', age:35}];
    res.json(data);
    res.end();
});

//127.0.0.1:3000/json/ex3.json?key=a1
router.get('/ex3.json', function(req, res, next) {
    var key = req.query.key;
    if(key == 'a1'){
        var data  = 
        {
            result:"y", 
            data: [{id:'abc', age:15},{id:'def', age:25},{id:'efg', age:35}]
        }
        res.json(data);
        res.end();
    }
    else {
        var data  = 
        {
            result:"n", 
            data : "not allowed"
        }
        res.json(data);
        res.end();
    }
});

//127.0.0.1:3000/json/ex4.json
router.get('/ex4.json', function(req, res, next) {
    var data  = {
        result  :   "y", 
        data    :   { 
            ret : 1, 
            list : [{id:'abc', age:15},{id:'def', age:25},{id:'efg', age:35}]
        }
    }
    res.json(data);
    res.end();
});

router.get('/ex5.json', function(req, res, next) {
    var sdata = "[";
    for (var i=1;i<=3;i++){
        var a = Math.floor(Math.random()*100+1);
        var b = Math.floor(Math.random()*100+1);
        var c = Math.floor(Math.random()*100+1);

        var arr = `['data${i}', ${a}, ${b}, ${c}]`;
        sdata += arr;
        if (i<3)
            sdata += ",";
    }
    sdata += "]";
    
    console.log(sdata);
    var data = {data : sdata};
    res.json(data);
    res.end();
});

router.get('/ex6.json', function(req, res, next) {
    var name = "abcd";
    var str = `aaa ${name}`;

    var data = {data : str};
    res.json(data);
    res.end();
});


module.exports = router;