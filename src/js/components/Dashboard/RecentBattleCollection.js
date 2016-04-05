var Backbone = require('backbone');
var dispatcher = require('../Events/dispatcher');
var RecentBattleModel = require('./RecentBattleCharacterModels');

var RecentBattleCollection = Backbone.Collection.extend({

    url: '/api/recentBattles',

    model: RecentBattleModel,

    initialize: function () {
        this.listenTo(dispatcher, 'battle', this.createBattle);
    },

    createBattle: function (res) {
        this.create(res);
    }
 
});

module.exports = RecentBattleCollection;