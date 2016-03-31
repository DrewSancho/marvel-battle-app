var Backbone = require('backbone');
var CharacterModel = require('./CharacterModel');

var CharacterCollection = Backbone.Collection.extend({
    model: CharacterModel,
    url: function () {
        return 'https://gateway.marvel.com/v1/public/characters?apikey=466ee3202b5cad51e4bc382d5b20303a';
    },
    parse: function (response) {
        return response.data.results;
    }
});

module.exports = new CharacterCollection();