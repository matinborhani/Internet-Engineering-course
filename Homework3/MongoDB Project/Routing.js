var http = require('http');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.use(express.static('public'));
var fs = require("fs");
app.set('view engine', 'pug');
app.set('views','./views');
var bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/home',function (req,res) {
    fs.readFile("home.html",function (err,data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })

});
//create a server object:
app.post('/', function (req, res) {
    Validation(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("persons").insertOne(req.body, function(err, res) {
            if (err)
            {
                result = "False";
                throw err;
            }
            else{
                console.log("this document insert");
                result = "True";
            }
            db.close();
        });
    });

    fs.readFile("success.html",function (err,data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })

});

app.get('/getall/:pagenum',function (req,res) {
    MongoClient.connect(url, function (err, db) {
        var page = req.params.pagenum;
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("persons").find({}).limit(5).skip(5* (page-1)).toArray(function (err, result) {
            if (err) throw err;
            res.render('ShowData',{
                persons: result
            });
            db.close();

        });
    });

});


var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
function Validation(data) {
    ValidationUsername(data.name);
    ValidateEmail(data.email)
    ValidationAddress(data.addr)
}
function ValidationUsername(username) {
    if(username === "")
        console.log("لطفا نام کاربری را وارد کنید");
}
function ValidationAddress(username) {
    if(username === "")
        console.log("لطفا آدرس را وارد کنید");
}

function ValidateEmail(mail)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {

        console.log("ایمیل وارد شده صحیح است")
    }
    console.log("ایمیل وارد شده صحیح نمی باشد");
}

function getAll() {
    var resultQuery;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("persons").find({}).limit(5).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            resultQuery = result;
            db.close();

        });
    });
    return resultQuery;
}

function getPage(url) {
    var page = url.slice(8,9);
    return page;

}

