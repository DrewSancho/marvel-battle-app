var Backbone = require('backbone');
var dispatcher = require('../Events/dispatcher');
var RecentBattleModel = require('./RecentBattleCharacterModels');


var RecentBattleCollection = Backbone.Collection.extend({

    model: RecentBattleModel

});

module.exports = RecentBattleCollection;