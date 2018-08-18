var express = require('express');
var app = express();
var movieInfo = require('./services/getYahooMoive.js')
var youtubeInfo = require('./services/getYoutube.js')
var bodyParser = require('body-parser');
// var morgan = require('morgan');
// var MongoClient = require('mongodb').MongoClient;
//确定数据库名称vuetest
// var mongoUrl = 'mongodb://localhost:27017/vuetest';
// var _db;
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));
// MongoClient.connect(mongoUrl, function (err, db) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('mongodb have connected your project');
//   _db = db;
  
// });
app.listen(8080, function () {
  console.log('server is running at 8080');
});
app.get('/movie',async function(req,res){
  let url = "https://movies.yahoo.com.tw/moviesearch_result.html?keyword=" + req.query.name;
  let datas = await movieInfo.firstSearch(encodeURI(url));
  //console.log(url + " " + datas)
  res.send( datas)
  return
})
app.get('/movieInfo',async function(req,res){
  let datas = await movieInfo.secondSearch(encodeURI(req.query.url));
  //console.log(req.query.url)
  datas.youtube = await youtubeInfo.firstSearch(encodeURI('https://www.youtube.com/results?search_query='+datas.title_zh+'+預告&sp=CAMSBBABGAFCBAgBEgA%253D'))
 // console.log(datas)
  res.send( datas)
  return
})
// //增加书籍
// app.post('/createBook', function(req, res, next) {
//   var request = req.body;
//   //接受请求
//   var collection = _db.collection('book');
//   //创建名为book的数据表
//   if(!request.name || !request.teacher || !request.introduction || !request.shopUrl || !request.pictureUrl) {
//     res.send({errcode:-1,errmsg:"参数不完整"});
//     return;
//   }
//   //插入数据表
//   collection.insert({name: request.name, teacher: request.teacher,introduction: request.introduction,shopUrl: request.shopUrl,pictureUrl: request.pictureUrl,}, function (err, ret) {
//     if(err) {
//       console.error(err);
//       res.status(500).end();
//     } else {
//       res.send({errcode:0,errmsg:"ok"});
//     }
//   });
//   });
  