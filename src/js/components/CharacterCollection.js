var Backbone = require('backbone');
var CharacterModel = require('./CharacterModel');

var CharacterCollection = Backbone.Collection.extend({
    model: CharacterModel,
    url: function () {
        return 'https://gateway.marvel.com/v1/public/characters?apikey=b28b7b0839633aa9e5ec65ba74293318';
    },
    parse: function (response) {
        return response.data.results;
    }
});

module.exports = new CharacterCollection();