var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var RecentBattleCharacterView = Backbone.View.extend({

    tagName: 'li',

    template: _.template(require('./RecentBattleView.html')),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }

});

module.exports = RecentBattleCharacterView;