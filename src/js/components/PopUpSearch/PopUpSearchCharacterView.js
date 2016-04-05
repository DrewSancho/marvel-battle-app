var Backbone = require('backbone');
var _ = require('underscore');

var PopUpSearchCharacterView = Backbone.View.extend({

    tagName: 'li',

    initialize: function (options) {
        this.popUpSearchView = options.popUpSearchView;
    },

    template: _.template(require('../Characters/characterView.html')),

    render: function (stats) {
        if (stats) {
            this.$el.html(this.template({
                character: this.model.attributes
            }));
        } else {
            this.$el.remove();
        }
    },

    events: {
        'click': 'onClick'
    },

    onClick: function () {
        this.popUpSearchView.trigger('select', this.model);
    }
});

module.exports = PopUpSearchCharacterView;