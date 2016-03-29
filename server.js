var express = require('express');
var $ = require('jquery');
var bodyParser = require('body-parser');
var app = express();

var searchesIds = 0;

var searches = [];

var stats = require('./src/js/components/stats.json');

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.get('/api/stats/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var stat = stats.find(function (x) { return x.id === id; });

    if (!stat) {
        return res.sendStatus(404);
    }

    res.json(stat);
});

app.get('/api/searches', function (req, res) {
    var result = searches;
    if (req.query.order === 'desc') {
        result = searches.slice().sort(function (a, b) {
            return a.date < b.date;
        });
    }
    res.json(result.slice(0, req.query.limit || 15));
});

app.post('/api/searches', function (req, res) {
    var search = {
        time: new Date(),
        characterId: req.body.id,
        thumbnail: req.body.thumbnail,
        name: req.body.name,
        id: ++searchesIds
    };
    searches.push(search);
    res.json(search);
});

app.listen(3000);