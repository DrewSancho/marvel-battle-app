var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var statsCache = require('../Utilities/statsCache');
var CharacterView = require('./CharacterView');
var SearchView = require('./SearchView');

var CharacterListView = Backbone.View.extend({

    initialize: function () {
        this.characterViews = [];
        this.listenTo(this.collection, 'sync', this.render);
    },

    template: _.template(require('./characterListView.html')),

    render: function () {
        var _this = this;

        this.removeChildren();

        this.$el.html(this.template());

        this.characterViews = this.collection.map(function (model) {
            return new CharacterView({ model: model });
        });

        this.searchView = new SearchView({ collection: this.collection });

        this.searchView.render();

        this.$('.searchSlot').append(this.searchView.$el);

        this.characterViews.forEach(function (view) {
            _this.$('.resultsSlot').append(view.$el);
            statsCache.get(view.model.get('id'), view.render.bind(view));
        });
    },

    removeChildren: function () {
        if (this.searchView) {
            this.searchView.remove();
        }
        this.characterViews.forEach(function (view) {
            view.remove();
        });
    }
});

module.exports = CharacterListView;