var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var SearchesView = require('./SearchesView');
var FavoriteCharacterView = require('./FavoriteCharacterView');
var RecentBattleCollectionView = require('./RecentBattleCollectionView');

var DashboardView = Backbone.View.extend({

    className: 'dashboardView',

    template: _.template(require('./dashboardView.html')),

    events: {
        'click .button': 'characterView'
    },

    initialize: function (options) {
        this.searchesCollection = options.searchesCollection;
        this.favoriteCharacterCollection = options.favoriteCharacterCollection;
        this.recentBattleCollection = options.recentBattleCollection;
        this.listenTo(this.searchesCollection, 'sync', this.render);
        this.listenTo(this.favoriteCharacterCollection, 'sync', this.render);
        this.listenTo(this.recentBattleCollection, 'sync', this.render);

        this.favoriteCharacterView = new FavoriteCharacterView({ collection: this.favoriteCharacterCollection });

        this.searchesView = new SearchesView({ collection: this.searchesCollection });

        this.recentBattleCollectionView = new RecentBattleCollectionView({ collection: this.recentBattleCollection });
    },

    render: function () {
        this.$el.html(this.template());
        this.searchesView.render();
        this.favoriteCharacterView.render();
        this.recentBattleCollectionView.render();
        this.$('.recent-battles-slot').append(this.recentBattleCollectionView.$el);
        this.$('.searches-slot').append(this.searchesView.$el);
        this.$('.random-favorites-slot').append(this.favoriteCharacterView.$el);
    },

    characterView: function () {
        window.location.hash = 'character';
    }
});

module.exports = DashboardView;