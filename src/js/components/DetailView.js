var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var dispatcher = require('./dispatcher');

var radarGraph = require('./utility').radarGraph;

var DetailView = Backbone.View.extend({
    className: 'detailView',

    template: _.template(require('./detailView.html')),

    initialize: function (options) {
        var _this = this;
        this.stats = options.stats;
        this.listenTo(this.model, 'sync', function () {
            _this.render();
            dispatcher.trigger('search', {
                characterId: _this.model.get('id'),
                name: _this.model.get('name'),
                thumbnail: _this.model.get('thumbnail')
            });
        });
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