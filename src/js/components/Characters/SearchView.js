var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var dispatcher = require('../Events/dispatcher');

var SearchView = Backbone.View.extend({

    className: 'searchView',
    template: _.template(require('./searchView.html')),
    events: {
        'click .submit': 'search',
        'keydown': 'onKeydown'
    },
    search: function () {
        var data;
        this.collection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
        data = $('input').val();
        window.location.hash = '/character/' + data;
    },
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            var data;
            this.collection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
            data = $('input').val();
            window.location.hash = '/character/' + data;
        }
    },
    render: function () {
        this.$el.html(this.template());
    },

    back: function () {
        window.location.hash = '/character';
    }
});

module.exports = SearchView;