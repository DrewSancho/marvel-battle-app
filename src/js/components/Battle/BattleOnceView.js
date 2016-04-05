var Backbone = require('backbone');
var _ = require('underscore');
var statsCache = require('../Utilities/statsCache.js');
var $ = require('jquery');
var dispatcher = require('../Events/dispatcher');

var BattleOnceView = Backbone.View.extend({

    events: {
        'click .fight-once': 'fight'
    },

    className: 'battle-once-view',

    template: _.template(require('./battleOnceView.html')),

    initialize: function (options) {
        this.character1 = options.character1;
        this.character2 = options.character2;
        $('.character1').animateCss('slideInLeft');
        $('.character2').animateCss('slideInRight');
        this.render();
    },

    render: function () {
        // Mix model attributes into new object with `image` property
        var character1 = Object.assign({
            image: this.character1.getImage()
        }, this.character1.attributes);

        var character2 = Object.assign({
            image: this.character2.getImage()
        }, this.character2.attributes);

        this.$el.html(this.template({
            character1: character1,
            character2: character2
        }));
    },

    fight: function () {

        var _this = this;

        $('.battle-messages').empty();

        // trigger 'battle' event on the dispatcher

        statsCache.get(this.character1.get('id'), function (stats1) {
            statsCache.get(_this.character2.get('id'), function (stats2) {
                var results = window.BattleManager.narrativeBattle(stats1, stats2, $('.fight-num').val());
                
                var winnerModel = _this.character1;
                var loserModel = _this.character2;

                if (_this.character2.get('id') === results.winner.id) {
                    winnerModel = _this.character2;
                    loserModel = _this.character1;
                }

                dispatcher.trigger('battle', {
                    winner: {
                        id: results.winner.id,
                        thumbnail: winnerModel.get('thumbnail')
                    },
                    loser: {
                        id: results.winner.id,
                        thumbnail: loserModel.get('thumbnail')
                    },
                    draw: results.winner === 'draw'
                });

                var i = 0;
                
                function battleTimeout () {
                    setTimeout(function () {
                        $('.battle-messages').prepend('<li class="">' + results.fightData[i].message + '</li>');
                        i++;
                        $('li:first-child').animateCss('fadeInDown');
                        if (i < results.fightData.length) {
                            battleTimeout();
                        }
                    }, 2500);
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