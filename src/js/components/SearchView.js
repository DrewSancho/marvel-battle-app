var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var dispatch = require('./dispatcher');

var SearchView = Backbone.View.extend({
    className: 'searchView',
    template: _.template(require('./searchView.html')),
    events: {
        'click .submit': 'search',
        'keydown': 'onKeydown'
    },
    search: function () {
        this.collection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
        $('input').val('');
        window.location.hash = '/character/filter';
    },
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            this.collection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
            $('input').val('');
            window.location.hash = '/character/filter';
        }
    },
    render: function () {
        this.$el.html(this.template());
    }
});

module.exports = SearchView;