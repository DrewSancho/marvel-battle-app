var Backbone = require('backbone');
var CharacterModel = require('./CharacterModel');

var CharacterCollection = Backbone.Collection.extend({
    model: CharacterModel,
    url: function (apikey, )
});

module.exports = new CharacterCollection();