var Backbone = require('backbone');
var SearchesCharacterModel = require('../Dashboard/SearchesCharacterModel');

var FavoriteCharacterCollection = Backbone.Collection.extend({
    model: SearchesCharacterModel,
    url: '/api/stats/random/favs'
});

module.exports = FavoriteCharacterCollection;