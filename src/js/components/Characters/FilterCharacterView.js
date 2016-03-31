var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var FilterCharacterView = Backbone.View.extend({

    template: _.template(require('./characterView.html')),

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