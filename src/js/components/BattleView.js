// This view will have two character models, img and name.
// footer with two buttons
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var BattleView = Backbone.View.extend({
    className: 'battle-vs-view',

    template: _.template(`
        <h2 class="heading">The fate of the Marvel Universe is in <em>your</em> hands.</h2>
        <div>Finally you hold the power to decide the true, ultimate super hero. Pit together
            two of your favorite characters for an all-out, duel to the death cage match!
        </div>
        <h3>The epic battle begins and ends here. Are you ready?</h3>
        <div class="player1">
            <div>Battle VS View</div>
            <img src="<%= thumbnail.path %>.jpg">
            <h2 class="name"> <%= name %></h2>
            <button class="select-left">Select</button>
        </div>
        <div class="player2">
            <img src="<$= thumbnail.path %>.jpg">
            <h2 class="name"> <%= name %></h2>
            <button class="select-right"><Select</button>
        </div>
        <button class="battle1">Battle</button>
        <button class="battle2">Battle2</button>
    `),

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