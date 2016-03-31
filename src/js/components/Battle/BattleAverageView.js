var Backbone = require('backbone');
var _ = require('underscore');
var CharacterModel = require('../Characters/CharacterModel');

var BattleAverageView = Backbone.View.extend({

    model: CharacterModel,

    className: 'battle-average-view',

    template: _.template(require('./battleAverageView.html')),

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template({
            character1: this.model.attributes,
            character2: this.model.attributes
        }));
    }
});

module.exports = BattleAverageView;