var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var SearchesView = require('./SearchesView');
var FavoriteCharacterView = require('./FavoriteCharacterView');

var DashboardView = Backbone.View.extend({

    className: 'dashboardView',

    template: _.template(require('./dashboardView.html')),

    initialize: function (options) {
        this.searchesCollection = options.searchesCollection;
        this.favoriteCharacterCollection = options.favoriteCharacterCollection;
        this.listenTo(this.searchesCollection, 'sync', this.render);
        this.listenTo(this.favoriteCharacterCollection, 'sync', this.render);

        this.favoriteCharacterView = new FavoriteCharacterView({ collection: this.favoriteCharacterCollection });

        this.searchesView = new SearchesView({ collection: this.searchesCollection });
    },

    render: function () {
        this.$el.html(this.template());
        this.searchesView.render();
        this.favoriteCharacterView.render();
        this.$('.searches-slot').append(this.searchesView.$el);
        this.$('.random-favorites-slot').append(this.favoriteCharacterView.$el);
    }
});

module.exports = DashboardView;