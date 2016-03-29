var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var CharacterCollection = require('./CharacterCollection');
var radarGraph = require('./utility').radarGraph;

var DetailView = Backbone.View.extend({
    className: 'detailView',

    template: _.template(require('./detailView.html')),

    initialize: function (options) {
        // var stats = options.stats;
        // this.child = new StatsView({ stats: [stats.durability, stats.energy, stats.fighting] })
        this.stats = options.stats;
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        // this.$('#container').append(JSON.stringify(this.stats));
        radarGraph(this.el.querySelector('#container'), this.stats);
    },

    events: {
        'click .select': 'select',
        'click .back': 'back'
    },

    select: function (id) {
        window.location.hash = 'battle/' + this.model.get('id');
    },
    back: function (id) {
        // window.location.hash = 'character/filter';
    }
});

module.exports = DetailView;