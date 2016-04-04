var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var statsCache = require('../Utilities/statsCache');
var CharacterCollection = require('../Characters/CharacterCollection');
var PopUpSearchCharacterView = require('./PopUpSearchCharacterView');
var CharacterModel = require('../Characters/CharacterModel');

var PopUpSearchView = Backbone.View.extend({
    // className: 'hidden',

    template: _.template(require('./popUpSearch.html')),
    events: {
        'click .submit': 'search',
        'click .random': 'random',
        'keydown': 'onKeydown'
    },
    search: function () {
        var _this = this;
        CharacterCollection.fetch({
            data: {
                nameStartsWith: this.$('.search').val()
            },
            success: function () {
                _this.renderSearchResults();
            }
        });
        this.$('.search').val('');
    },
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            this.search();
        }
    },
    initialize: function () {
        this.children = [];
    },
    render: function () {
        this.$el.html(this.template());
    },
    renderSearchResults: function () {
        var _this = this;
        this.children.forEach(function (view) {
            view.remove();
        });

        this.children = CharacterCollection.map(function (model) {
            return new PopUpSearchCharacterView({ model: model, popUpSearchView: _this });
        });

        this.children.forEach(function (view) {
            statsCache.get(view.model.get('id'), view.render.bind(view));
            _this.$('.resultsSlot').append(view.$el);
        });
    },
    random: function () {
        var _this = this;
        $.get('api/stats/random', function (stats) {
            var model = new CharacterModel({ id: stats.id });
            model.fetch({
                success: function () {
                    _this.trigger('select', model);
                }
            });
        });
    }
});

module.exports = PopUpSearchView;