// This view will have two character models, img and name.
// footer with two buttons
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var BattleView = Backbone.View.extend({
    className: 'battle-vs-view',

    template: _.template(require('./battleView.html')),

    initialize: function () {
    },

    render: function () {
        this.$el.html(this.template());
    },

    events: {
        'click .select-left': 'selectLeft',
        'click .select-right': 'selectRight',
        'click .battle1': 'battle1',
        'click .battle2': 'battle2'
    },

    selectLeft: function () {
        window.location.hash = '/battle/search';
    },

    selectRight: function () {
        window.location.hash = '/battle/search';
    },

    battle1: function () {
        // average battle view
    },

    battle2: function () {
        // single battle view
        window.location.hash = '/battle/battle1';
    }

});

module.exports = BattleView;