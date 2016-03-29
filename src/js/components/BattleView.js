// This view will have two character models, img and name.
// footer with two buttons
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var CharacterSelectView = require('./CharacterSelectView');

var dispatcher = require('./dispatcher');

var BattleView = Backbone.View.extend({
    className: 'battle-view',

    template: _.template(`
        <h2 class="heading">The fate of the Marvel Universe is in <em>your</em> hands.</h2>
        <div>Finally you hold the power to decide the true, ultimate super hero. Pit together
            two of your favorite characters for an all-out, duel to the death cage match!
        </div>
        <h3>The epic battle begins and ends here. Are you ready?</h3>
        <div class="characterSelect-1"></div>
        <div class="characterSelect-2"></div>
        <button class="battle1">Battle</button>
        <button class="battle2">Battle2</button>
    `),

    initialize: function (options) {
        options = options || {};
        this.character1 = options.character1;
        this.character2 = options.character2;
        this.characterSelect1 = new CharacterSelectView({ model: this.character1 });
        this.characterSelect2 = new CharacterSelectView({ model: this.character2 });
    },

    render: function () {
        this.$el.html(this.template());
        this.characterSelect1.render();
        this.characterSelect2.render();
        this.$('.characterSelect-1').append(this.characterSelect1.$el);
        this.$('.characterSelect-2').append(this.characterSelect2.$el);
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
        window.location.hash = '/battle/battle2';
    }

});

module.exports = BattleView;