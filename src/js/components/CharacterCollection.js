var Backbone = require('backbone');
var CharacterModel = require('./CharacterModel');

var CharacterCollection = Backbone.Collection.extend({
    model: CharacterModel,
    url: '/api/characters'
});

module.exports = new CharacterCollection();