var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var averageGraph = require('../Utilities/averageGraph').averageGraph;

var statsCache = require('../Utilities/statsCache');

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

    renderGraph: function (results) {
        averageGraph(this.$('.matchup-radar-chart')[0], results);
    },

    fight: function () {
        $('#container').empty();
        var _this = this;
        statsCache.get(this.character1.get('id'), function (stats1) {
            statsCache.get(_this.character2.get('id'), function (stats2) {
                var results = window.BattleManager.statBattle(stats1, stats2, $('.fight-num').val() || 100);

                _this.renderGraph(results);
                $('.character1-wins').text('Wins: ' + results.fighter1.wins);
                $('.character1-losses').text('Losses: ' + results.fighter2.wins);
                $('.character1-draws').text('Draws: ' + results.fighter1.draws);
                $('.character2-wins').text('Wins: ' + results.fighter2.wins);
                $('.character2-losses').text('Losses: ' + results.fighter1.wins);
                $('.character2-draws').text('Draws: ' + results.fighter2.draws);
            });
        });
        $('.fight-num').val('');
    },
    onKeyDown: function (e) {
        if (e.keyCode === 13) {
            this.fight();
        }
    }
});

module.exports = BattleAverageView;