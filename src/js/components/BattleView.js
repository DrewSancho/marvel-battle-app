// This view will have two character models, img and name.
// footer with two buttons
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var CharacterSelectView = require('./CharacterSelectView');

var dispatcher = require('./dispatcher');

var BattleView = Backbone.View.extend({
    className: 'battle-view',

    template: _.template(require('./battleView.html')),

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
        'click .battle2': 'battle2',
        'click .randomizer': 'random'
    },

    selectLeft: function () {
        window.location.hash = '/battle/search';
    },

    selectRight: function () {
        window.location.hash = '/battle/search2';
    },

    battle1: function () {
        // average battle view
    },

    battle2: function () {
        // single battle view
        window.location.hash = '/battle/battle2';
    },
    random: function () {
        
    }

});

module.exports = BattleView;