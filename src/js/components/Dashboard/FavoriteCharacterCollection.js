var Backbone = require('backbone');
var CharacterModel = require('../Characters/CharacterModel');

var FavoriteCharacterCollection = Backbone.Collection.extend({
    model: CharacterModel,
    url: '/api/stats/random/favs'
});

module.exports = FavoriteCharacterCollection;