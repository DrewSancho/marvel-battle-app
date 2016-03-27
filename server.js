var express = require('express');
var $ = require('jquery');
var bodyParser = require('body-parser');
var app = express();

var data = [];

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

var apikey = 'b28b7b0839633aa9e5ec65ba74293318';
var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=';

app.listen(3000);

function getMarvelAPI (input, callback) {
        app.get('https://gateway.marvel.com/v1/public/characters?nameStartsWith=', {
            nameStartsWith: input,
            apikey: apikey
        }, callback);
    }