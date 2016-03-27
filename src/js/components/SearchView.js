var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var dispatch = require('./dispatcher');
var CharacterCollection = require('./CharacterCollection');

var SearchView = Backbone.View.extend({
    className: 'searchView',
    template: _.template(`
        <input class="search" placeHolder="Name Starts With">
        <button class="submit">Search</button>
        <div id="results"></div>
    `),
    events: {
        'click .submit': 'search',
        'keydown': 'onKeydown'
    },
    search: function () {
        CharacterCollection.fetch(this.$el.val());
        $('input').val('');
    },
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            CharacterCollection.fetch(this.$el.val());
            $('input').val('');
        }
    },
    render: function () {
        this.$el.html(this.template());
    }
});

module.exports = SearchView;