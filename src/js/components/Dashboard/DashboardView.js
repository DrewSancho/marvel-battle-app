var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var SearchesCollection = require('./SearchesCollection');
var dispatcher = require('../Events/dispatcher');

var DashboardView = Backbone.View.extend({

    className: 'dashboardView',

    template: _.template(require('./dashboardView.html')),

    initialize: function () {
        this.collection = SearchesCollection;
        this.children = [];
    },

    render: function () {
        var model, characterView;
        for (var i = SearchesCollection.length - 1; i >= 0; i--) {
            model = this.collection.models[i];
            characterView = new CharacterView({ model: model });
            this.children.push(characterView);
            this.$el.append(characterView.$el);
            characterView.render();
            // this.$el.append(this.template({
            //     name: collection.name,
            //     thumbnail: collection.thumbnail.path + '.' + collection.thumbnail.extension
            // }));
        };
    },

    events: {
        'click img': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
    }

});

module.exports = DashboardView;