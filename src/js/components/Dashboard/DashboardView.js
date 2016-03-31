var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var SearchesView = require('./SearchesView');
// var dispatcher = require('../Events/dispatcher');

var DashboardView = Backbone.View.extend({

    className: 'dashboardView',

    template: _.template(require('./dashboardView.html')),

    initialize: function (options) {
        this.searchesCollection = options.searchesCollection;

        // this.listenTo(this.model, 'sync', function () {
        //     dispatcher.trigger();
        // }, this);

        this.searchesView = new SearchesView({ collection: this.searchesCollection });
    },

    render: function () {
        this.$el.html(this.template());
        this.searchesView.render();
        this.$('.searches-slot').append(this.searchesView.$el);
    },

    events: {
        'click img': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
    }

});

module.exports = DashboardView;