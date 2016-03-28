var express = require('express');
var $ = require('jquery');
var bodyParser = require('body-parser');
var app = express();

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

app.listen(3000);