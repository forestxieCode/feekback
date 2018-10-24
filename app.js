var express = require('express');
var app = express();
var fs=require('fs');
var router=require('./router');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public/',express.static('./public/'));
app.use('/node_modules/',express.static('./node_modules/'));

app.engine('html',require('express-art-template'))

app.use(router);

app.listen(3000,function(){
	console.log('nodejs server start port:3000');
})

   