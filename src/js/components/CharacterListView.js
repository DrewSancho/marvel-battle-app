var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var CharacterView = require('./CharacterListView');

var CharacterListView = Backbone.View.extend({
    className: 'CharacterView',

    template: _.template(`
        <div> <%= img => </div>
        <div> <%= name => </div>
    `),
    initialize: function () {
        this.children = [];
        this.render();
        this.listenTo(this.collection, 'sync', this.render);
    },
    render: function () {
        var that = this;

        this.removeChildren();

        this.$el.html(this.template());

        this.children = this.collection.map(function (model) {
            return new CharacterView({ model: model });
        });

        this.children.forEach(function (view) {
            that.$el.append(view.$el);
            view.render();
        });
    },
    events: {
        'click img': 'details'
    },
    details: function () {
        window.location.hash = 'details';
    }
});

module.exports = CharacterListView;