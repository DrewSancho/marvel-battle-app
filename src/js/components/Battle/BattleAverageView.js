var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var statsCache = require('../Utilities/statsCache.js');

var BattleAverageView = Backbone.View.extend({

    events: {
        'click .fight': 'fight',
        'keydown': 'onKeyDown'
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
                var results = window.BattleManager.statBattle(stats1, stats2, $('.fight-num').val());
                $('.character1-wins').append(results.fighter1.wins);
                $('.character1-draws').append(results.fighter1.draws);
                $('.character1-losses').append(results.fighter2.wins);
                $('.character2-wins').append(results.fighter2.wins);
                $('.character2-draws').append(results.fighter2.draws);
                $('.character2-losses').append(results.fighter1.wins);
            });
        });
        $('input').val('');
    },
    onKeyDown: function (e) {
        if (e.keyCode === 13) {
            this.fight();
        }
    }
});

module.exports = BattleAverageView;