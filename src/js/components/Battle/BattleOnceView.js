var Backbone = require('backbone');
var _ = require('underscore');
var statsCache = require('../Utilities/statsCache.js');
var $ = require('jquery');

var BattleOnceView = Backbone.View.extend({

    events: {
        'click .fight-once': 'fight'
    },

    className: 'battle-once-view',

    template: _.template(require('./battleOnceView.html')),

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
        $('.battle-messages').empty();
        var _this = this;
        statsCache.get(this.character1.get('id'), function (stats1) {
            statsCache.get(_this.character2.get('id'), function (stats2) {
                var results = window.BattleManager.narrativeBattle(stats1, stats2, $('.fight-num').val());
                var i = 0;
                function battleTimeout () {
                    setTimeout(function () {
                        $('.battle-messages').prepend('<li>' + results.fightData[i].message + '</li>');
                        i++;
                        if (i < results.fightData.length) {
                            battleTimeout();
                        }
                    }, 1500);
                }
                battleTimeout();
            });
        });

                // $('.character1-wins').append(results.fighter1.wins);
                // $('.character1-draws').append(results.fighter1.draws);
                // $('.character2-wins').append(results.fighter2.wins);
                // $('.character2-draws').append(results.fighter2.draws);
    }
});

module.exports = BattleOnceView;