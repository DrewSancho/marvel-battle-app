var Backbone = require('backbone');

var FavoriteView = require('./FavoriteView');

var FavoriteCharacterView = Backbone.View.extend({

    initialize: function () {
        this.children = [];
    },

    render: function () {
        var _this = this;

        this.children.forEach(function (view) {
            view.remove();
        });

        this.children = this.collection.map(function (model) {
            return new FavoriteView({ model: model });
        });

        this.children.forEach(function (view) {
            view.render();
            _this.$el.append(view.$el);
        });
    }

});

module.exports = FavoriteCharacterView;