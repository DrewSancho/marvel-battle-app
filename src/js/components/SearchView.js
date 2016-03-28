var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var dispatch = require('./dispatcher');

var SearchView = Backbone.View.extend({
    className: 'searchView',
    template: _.template(`
        <input class="search" placeHolder="Name Starts With">
        <button class="submit">Search</button>
    `),
    events: {
        'click .submit': 'search',
        'keydown': 'onKeydown'
    },
    search: function () {
        this.collection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
        $('input').val('');
    },
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            this.collection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
            $('input').val('');
        }
    },
    render: function () {
        this.$el.html(this.template());
    }
});

module.exports = SearchView;