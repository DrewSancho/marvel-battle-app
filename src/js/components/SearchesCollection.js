var Backbone = require('backbone');
var dispatcher = require('./dispatcher');

var SearchesCollection = Backbone.Collection.extend({

    initialize: function () {
        this.listenTo(dispatcher, 'search', this.createSearch);
    },

    createSearch: function (obj) {
        this.create(obj);
    },

    url: '/api/searches?sort=desc'
});

window.searchesCollection = new SearchesCollection();

module.exports = window.searchesCollection;