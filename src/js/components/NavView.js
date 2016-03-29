var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var NavView = Backbone.View.extend({
    template: _.template(`
        <button class='home'> home </button>
        <button class= 'characters'> characters </button>
        <button class= 'battle'> battle </button>
        `),
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
        window.location.hash = 'battle/:id/:id';
    }
});

module.exports = NavView;