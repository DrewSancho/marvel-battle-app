var express = require('express');
var $ = require('jquery');
var bodyParser = require('body-parser');
var app = express();

var searchCache = [];

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

var apikey = 'b28b7b0839633aa9e5ec65ba74293318';
var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=';

app.listen(3000);

// app.get('https://gateway.marvel.com/v1/public/characters', {
//     nameStartsWith: 'spider',
//     apikey: apikey
// }, function (req, res) {
//     res.json(searchCache);
// });