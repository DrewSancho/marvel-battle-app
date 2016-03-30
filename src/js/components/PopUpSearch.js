var Backbone = require('backbone');
var CharacterCollection = require('./CharacterCollection');
var _ = require('underscore');
var $ = require('jquery');

var statsCache = require('./statsCache');

var PopUpSearchCharacterView = require('./PopUpSearchCharacterView');

var PopUpSearchView = Backbone.View.extend({
    className: 'hidden',

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
        $('input').val('');
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
    }
});

module.exports = PopUpSearchView;