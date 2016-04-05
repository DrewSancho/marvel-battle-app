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

        // this.renderGraph(this.character1, this.character2);
    },

    render: function () {
        this.$el.html(this.template({
            character1: this.character1.attributes,
            character2: this.character2.attributes
        }));
    },

    renderGraph: function () {
        averageGraph(this.$('#container')[0], this.stats1, this.stats2);
    },

    fight: function () {
        $('#container').empty();
        var _this = this;
        statsCache.get(this.character1.get('id'), function (stats1) {
            statsCache.get(_this.character2.get('id'), function (stats2) {
                var results = window.BattleManager.statBattle(stats1, stats2, $('.fight-num').val());
                _this.renderGraph(results);
                // $('.character1-wins').append('Win Percentage: ' + Math.floor((results.fighter1.wins / $('.fight-num').val()) * 100) + '%');
                // $('.character1-losses').append('Loss Percentage: ' + Math.floor((results.fighter2.wins / $('.fight-num').val()) * 100) + '%');
                // $('.character1-draws').append('Draw Percentage: ' + Math.floor((results.fighter1.draws / $('.fight-num').val()) * 100) + '%');
                // $('.character2-wins').append('Win Percentage: ' + Math.floor((results.fighter2.wins / $('.fight-num').val()) * 100) + '%');
                // $('.character2-losses').append('Loss Percentage: ' + Math.floor((results.fighter1.wins / $('.fight-num').val()) * 100) + '%');
                // $('.character2-draws').append('Draw Percentage: ' + Math.floor((results.fighter2.draws / $('.fight-num').val()) * 100) + '%');
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