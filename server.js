var express = require('express');
var $ = require('jquery');
var bodyParser = require('body-parser');
var app = express();
var randomFavorites = require('./src/js/components/Utilities/randomFavorites');

var searchesIds = 0;
var searches = [];

var recentBattles = [];
var battlesIds = 0;

var stats = require('./src/js/components/Utilities/stats.json');

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.get('/api/stats/random', function (req, res) {
    var index = Math.floor(Math.random() * stats.length);

    res.json(stats[index]);
});

app.get('/api/stats/random/favs', function (req, res) {
    var randomArray = [];
    var character;
    for (var i = 0; i < 3; i++) {
        character = randomFavorites[ Math.floor(Math.random() * randomFavorites.length) ];
        if (randomArray.indexOf(character) > -1) {
            i--;
        } else {
            randomArray.push(character);
        }
    }

    res.json(randomArray);
});

app.get('/api/stats/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var stat = stats.find(function (x) { return x.id === id; });

    if (!stat) {
        return res.sendStatus(404);
    }

    res.json(stat);
});

app.get('/api/recentBattles', function (req, res) {
    var result = recentBattles;

    // Order the results
    if (req.query.order === 'desc') {
        result = result.slice().sort(function (a, b) {
            return b.date - a.date;
        });
    }

    res.json(result.slice(0, req.query.limit || 15));
});

app.post('/api/recentBattles', function (req, res) {
    var battleCharInfo = {
        winner: req.body.winner,
        loser: req.body.loser,
        draw: req.body.draw,
        id: ++battlesIds
    };
    recentBattles.push(battleCharInfo);
    res.json(battleCharInfo);
});

app.get('/api/searches', function (req, res) {
    var result = searches;

    result = result.reduce(function (a, x) {
        // Find a search with the same character
        var contains = a.filter(function (y) {
            return x.characterId === y.characterId;
        })[0];

        // If we found a search with the same character
        if (contains) {
            // and if the search date is before x's search date
            if (contains.date < x.date) {
                // overwrite with the newer search
                a[a.indexOf(contains)] = x;
            }
        } else {
            a.push(x);
        }

        // return the current version of the array
        return a;
    }, []);

    // Order the results
    if (req.query.order === 'desc') {
        result = result.slice().sort(function (a, b) {
            return b.date - a.date;
        });
    }

    res.json(result.slice(0, req.query.limit || 15));
});

app.post('/api/searches', function (req, res) {
    var search = {
        date: new Date(),
        characterId: req.body.characterId,
        thumbnail: req.body.thumbnail,
        name: req.body.name,
        id: ++searchesIds
    };
    searches.push(search);
    res.json(search);
});

app.listen(3000);