var Backbone = require('backbone');
var _ = require('underscore');

var CharacterView = Backbone.View.extend({
    events: {
        'click .charImage': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
    },

    template: _.template(`
        <img class="charImage" src="<%= thumbnail.path %>.jpg">
        <div class="charName"> <%= name %> </div>
    `),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }

});

module.exports = CharacterView;