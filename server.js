var querystring = require('querystring');
var util = require('util');
var express = require('express');
const mustache = require('mustache-express');
const app = express();
const server = require('http').createServer(app);
const fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { Console } = require('console');
let page = fs.readFileSync("quotes.json").toString();
var dictionary  = JSON.parse(page);


//静态资源目录
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());
//路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

//处理web搜索请求
app.post('/search', (req, res) => {
    console.log(req.body.name)
    var arr = search(req.body.name);
    var data = {"result": arr}
    console.log(data)
    res.json(data)
});

//搜索function
function search(string){
    listOWords = string.toLowerCase().split(" ");
    var animes = [[]];
    var names = [[]];
    var quotes = [[]];
    for(let i=0;i<listOWords.length;i++){
        console.log(dictionary[listOWords[i]]["quotes"].length);
        for(let j=0;j<dictionary[listOWords[i]]["quotes"].length;j++){
            try{
                if(!quotes[0].includes(dictionary[listOWords[i]]["quotes"][j])){
                    animes[0].push(dictionary[listOWords[i]]["animes"][j]);
                    names[0].push(dictionary[listOWords[i]]["names"][j]);
                    quotes[0].push(dictionary[listOWords[i]]["quotes"][j]);
                }
            } catch{}
        }

    }
    return [animes, names, quotes];
}

server.listen(6060, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});