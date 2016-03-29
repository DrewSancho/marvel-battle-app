var Backbone = require('backbone');
var CharacterCollection = require('./CharacterCollection');
var _ = require('underscore');
var $ = require('jquery');

var PopUpSearchView = Backbone.View.extend({
    className: 'hidden',

    template: _.template(require('./searchView.html')),
    events: {
        'click .submit': 'search',
        'keydown': 'onKeydown'
    },
    search: function () {
        CharacterCollection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
        $('input').val('');
    },
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            CharacterCollection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
            $('input').val('');
        }
    },
    render: function () {
        this.$el.html(this.template());
    }
});

module.exports = PopUpSearchView;