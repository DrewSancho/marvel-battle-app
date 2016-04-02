var Backbone = require('backbone');
var dispatcher = require('../Events/dispatcher');
var SearchesCharacterModel = require('../Dashboard/SearchesCharacterModel');

var SearchesCollection = Backbone.Collection.extend({

    model: SearchesCharacterModel,

    parse: function (response) {
        return response.slice(0, 3);
    },

    initialize: function () {
        this.listenTo(dispatcher, 'search', this.createSearch);
    },

    createSearch: function (obj) {
        this.create(obj);
    },

    url: '/api/searches?order=desc'
});

module.exports = new SearchesCollection();