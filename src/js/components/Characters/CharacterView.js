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

    template: _.template(require('./characterView.html')),

    initialize: function (stats) {
    },

    render: function (stats) {
        if (!stats) {
            this.$el.remove();
        }
        this.$el.html(this.template({
            character: this.model.attributes,
            stats: stats
        }));
    }

});

module.exports = CharacterView;