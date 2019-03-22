var express = require('express');
var app = express();
var movieInfo = require('./services/getYahooMoive.js')
var youtubeInfo = require('./services/getYoutube.js')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('dist'));

app.listen(8080, function () {
  console.log('server is running at 8080');
});
app.get('/movie',async function(req,res){
  let datas = await movieInfo.firstSearch(req.query.name);
  //console.log(url + " " + datas)
  res.send( datas)
  return
})
app.get('/movieInfo',async function(req,res){
  let datas = await movieInfo.secondSearch(req.query.url);
  //console.log(req.query.url)
  datas.youtube = await youtubeInfo.firstSearch(datas.title_zh)
 // console.log(datas)
  res.send( datas)
  return
})

  