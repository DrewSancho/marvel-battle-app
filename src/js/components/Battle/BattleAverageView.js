var Backbone = require('backbone');
var _ = require('underscore');

var statsCache = require('../Utilities/statsCache.js');

var BattleAverageView = Backbone.View.extend({

    events: {
        'click .fight': 'fight'
    },

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
    },

    fight: function () {
        var _this = this;
        statsCache.get(this.character1.get('id'), function (stats1) {
            statsCache.get(_this.character2.get('id'), function (stats2) {
                var x = window.BattleManager.statBattle(stats1, stats2, 10);
                console.log(x);
            });
        });
    }
});

module.exports = BattleAverageView;