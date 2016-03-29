var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var FilterCharacterView = Backbone.View.extend({

    template: _.template(`
        <img class="charImage" src="<%= character.thumbnail.path + '.' + character.thumbnail.extension %>">
        <div class="charName"> <%= character.name %> </div>
        <% if (!stats) { %>
            No data available.
        <% } %>
    `),

    render: function () {
        this.$el.html(this.template());
    },

    events: {
        'click': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
    }
});

module.exports = FilterCharacterView;