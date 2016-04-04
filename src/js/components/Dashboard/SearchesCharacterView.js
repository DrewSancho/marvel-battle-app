var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var SearchesCharacterView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('characterId');
    },

    template: _.template(require('./searchesCharacterView.html')),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }

});

module.exports = SearchesCharacterView;