var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var CharacterView = require('./CharacterView');

var CharacterListView = Backbone.View.extend({
    className: 'CharacterView',

    initialize: function () {
        this.children = [];
        this.render();
        this.listenTo(this.collection, 'sync', this.render);
    },
    render: function () {
        var that = this;

        this.removeChildren();

        this.children = this.collection.map(function (model) {
            return new CharacterView({ model: model });
        });

        this.children.forEach(function (view) {
            that.$el.append(view.$el);
            view.render();
        });
    },
    removeChildren: function () {
        this.children.forEach(function (view) {
            view.remove();
        });
    }
});

module.exports = CharacterListView;