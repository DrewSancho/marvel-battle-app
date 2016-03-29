var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var CharacterView = Backbone.View.extend({
    events: {
        'click .charImage': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
    },

    template: _.template(`
        <img class="charImage" src="<%= character.thumbnail.path %>.jpg">
        <div class="charName"> <%= character.name %> </div>
        <% if (stats) { %>
            Strength: <%= stats.strength %>
        <% } else { %>
            No data available.
        <% } %>
    `),

    initialize: function () {

    },

    render: function (stats) {
        this.$el.html(this.template({
            character: this.model.attributes,
            stats: stats
        }));
    }

});

module.exports = CharacterView;