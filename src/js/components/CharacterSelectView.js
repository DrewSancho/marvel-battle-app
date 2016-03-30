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
        'click .select': 'onClick'
    },

    onClick: function () {
        var _this = this;
        var popUpSearch = new PopUpSearch();
        popUpSearch.render();
        this.$('.searchSlot').append(popUpSearch.$el);
        popUpSearch.on('select', function (model) {
            _this.select(model);
        });
    },

    select: function (model) {
        this.model = model;
        this.render();
        this.trigger('select', model);
    }
});

module.exports = CharacterSelectView;