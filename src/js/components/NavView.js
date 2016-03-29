var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var NavView = Backbone.View.extend({
    template: _.template(require('./navView.html')),
    render: function () {
        this.$el.html(this.template());
    },
    events: {
        'click .home': 'goHome',
        'click .characters': 'characterView',
        'click .battle': 'battleView'
    },
    goHome: function () {
        window.location.hash = 'index';
    },
    characterView: function () {
        window.location.hash = 'character';
    },
    battleView: function () {
        window.location.hash = 'battle';
    }
});

module.exports = NavView;