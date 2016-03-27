var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DetailView = Backbone.View.extend({
    className: 'detailView',

    template: _.template(`
        <div class="thumbnail"> <%= thumbnail %> </div>
        <h2 class="name"> name</h2>
        <div class="description"> <%= description %> </div>
        <div class="appearances"> <%= appearances %> </div>
        <div class="detailNav">
        <button class="select"> select </button>
        <button class="back"> characters </button>
        </div>
    `),

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
        window.location.hash = 'search';
    }
});

module.exports = DetailView;