var Backbone = require('backbone');
var _ = require('underscore');

var BattleAverageView = Backbone.View.extend({

    className: 'battle-average-view',

    template: _.template(require('./battleAverageView.html')),

    render: function () {
        this.$el.html(this.template());
    }
});

module.exports = BattleAverageView;