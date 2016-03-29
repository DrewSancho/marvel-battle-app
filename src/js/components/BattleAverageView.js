var Backbone = require('backbone');
var _ = require('underscore');

var BattleAverageView = Backbone.View.extend({

    className: 'battle-average-view',

    template: _.template(`
        <img class="thumbnail" src="<%= thumbnail.path %>.jpg">
        <img class="thumbnail" src="<%= thumbnail.path %>.jpg">
    `),

    render: function () {
        this.$el.html(this.template());
    }
});

module.exports = BattleAverageView;