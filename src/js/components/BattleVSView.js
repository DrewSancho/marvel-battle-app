// This view will have two character models, img and name.
// footer with two buttons
var Backbone = require('backbone');
var _ = require('underscore');

var BattleVSView = Backbone.View.extend({
    className: 'battle-vs-view',

    template: _.template(`
        <div class="player1">
            <img src="<%= thumbnail.path %>.jpg">
            <h2 class="name"> <%= name %>
            <button class="select-left">Select</button>
        </div>
        <div class="player2">
            <img src="<$= thumbnail.path %>.jpg">
            <button class="fight"><button>
            <button class="select-right"><Select</button>
        </div>
    `),

    render: function () {
        this.$el.html(this.template());
    },

    events: {
        'click .select-left': 'selectLeft',
        'click .select-right': 'selectRight'
    },

    selectLeft: function () {
        // popup view
    },

    selectRight: function () {
        // popup view
    }

});

module.exports = BattleVSView;