var Backbone = require('backbone');
var _ = require('underscore');

var CharacterView = Backbone.View.extend({
    events: {
        'click img': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
    },

    template: _.template(`
    `),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }

});

module.exports = CharacterView;