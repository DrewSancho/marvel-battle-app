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
        <div class="detailNav">
        <button class="select"> select </button>
        <button class="back"> characters </button>
        </div>
    `),

    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    },

    events: {
        'click .select': 'select',
        'click .back': 'back'
    },

    select: function (id) {
        window.location.hash = 'battle/:id';
    },
    back: function (id) {
        window.location.hash = 'character';
    }
});

module.exports = DetailView;