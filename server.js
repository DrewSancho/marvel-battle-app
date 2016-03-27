var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var data = [];

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.listen(3000);