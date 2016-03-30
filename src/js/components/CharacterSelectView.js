var Backbone = require('backbone');
var _ = require('underscore');

var PopUpSearch = require('./PopUpSearch');

var CharacterSelectView = Backbone.View.extend({
    template: _.template(require('./characterSelectView.html')),
    render: function () {
        if (this.model) {
            this.$el.html(this.template(this.model.attributes));
        } else {
            this.$el.html(this.template({
                thumbnail: false,
                name: 'Select a character!'
            }));
        }
    },
    events: {
        'click .select': 'onSelect'
    },

    onSelect: function () {
        window.location.hash = 'character';
    }
});

module.exports = CharacterSelectView;