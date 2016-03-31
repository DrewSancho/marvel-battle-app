var Backbone = require('backbone');

var SearchesCharacterView = require('./SearchesCharacterView');

var SearchesView = Backbone.View.extend({

    initialize: function () {
        this.children = [];
    },

    render: function () {
        var _this = this;

        this.children.forEach(function (view) {
            view.remove();
        });

        this.children = this.collection.map(function (model) {
            return new SearchesCharacterView({ model: model });
        });

        this.children.forEach(function (view) {
            view.render();
            _this.$el.append(view.$el);
        });
    }

});

module.exports = SearchesView;