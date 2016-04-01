var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var FavoriteView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
    },

    template: _.template(require('./favoriteCharacterCollection.html')),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }

});

module.exports = FavoriteView;