var Backbone = require('backbone');
var RecentBattleCharacterView = require('./RecentBattleCharacterView');

var RecentBattleCollectionView = Backbone.View.extend({

    tagName: 'ul',

    className: 'battle-results',

    initialize: function () {
        this.children = [];
    },

    render: function () {
        var _this = this;

        this.children.forEach(function (view) {
            view.remove();
        });

        this.children = this.collection.map(function (model) {
            return new RecentBattleCharacterView({ model: model });
        });

        this.children.forEach(function (view) {
            view.render();
            _this.$el.append(view.$el);
        });
    }
});

module.exports = RecentBattleCollectionView;