var Backbone = require('backbone');
var _ = require('underscore');
var CharacterModel = require('../Characters/CharacterModel');

var BattleAverageView = Backbone.View.extend({

    className: 'battle-average-view',

    template: _.template(require('./battleAverageView.html')),

    initialize: function (options) {
        this.character1 = options.character1;
        this.character2 = options.character2;
        this.render();
    },

    render: function () {
        this.$el.html(this.template({
            character1: this.character1.attributes,
            character2: this.character2.attributes
        }));
    }
});

module.exports = BattleAverageView;