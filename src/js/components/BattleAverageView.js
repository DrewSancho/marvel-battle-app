var Backbone = require('backbone');
var _ = require('underscore');

var BattleAverageView = Backbone.View.extend({

    className: 'battle-average-view',

    template: _.template(require('./battleAverageView.html')),

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
    }
});

module.exports = BattleAverageView;