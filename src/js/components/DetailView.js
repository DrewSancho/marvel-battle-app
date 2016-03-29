var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DetailView = Backbone.View.extend({
    className: 'detailView',

    template: _.template(`
        <img class="thumbnail" src="<%= thumbnail.path %>.jpg">
        <h2 class="name"> <%= name %> </h2>
        <div class="description"> <%= description %> </div>
        <div class="appearances"> <%= comics.available %> appearances </div>
        <div id="container"></div>
        <div class="detailNav">
        <button class="select"> select </button>
        <button class="back"> characters </button>
        </div>
    `),

    initialize: function (options) {
        // var stats = options.stats;
        // this.child = new StatsView({ stats: [stats.durability, stats.energy, stats.fighting] })
        // this.stats = options.stats;
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        this.$('#container').append(JSON.stringify(this.stats));
    },

    events: {
        'click .select': 'select',
        'click .back': 'back'
    },

    select: function (id) {
        window.location.hash = 'battle/:id/:id';
    },
    back: function (id) {
        window.location.hash = 'character/filter';
    }
});

module.exports = DetailView;