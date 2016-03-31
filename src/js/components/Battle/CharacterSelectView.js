var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var PopUpSearch = require('../popUpSearch/PopUpSearch');

var CharacterSelectView = Backbone.View.extend({
    template: _.template(require('./characterSelectView.html')),

    initialize: function () {
        this.hidePopUpSearch = this.hidePopUpSearch.bind(this);
    },

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

    hidePopUpSearch: function (e) {
        if (this.$('.searchSlot').has(e.target).length > 0) {
            return;
        }

        if (this.popUpSearch) {
            this.popUpSearch.remove();
            this.popUpSearch = null;
        }

        window.removeEventListener('click', this.hidePopUpSearch);
    },

    onClick: function () {
        var _this = this;
        if (this.popUpSearch) {
            return;
        }

        window.addEventListener('click', this.hidePopUpSearch, true);

        this.popUpSearch = new PopUpSearch();
        this.popUpSearch.render();

        this.$('.searchSlot').append(this.popUpSearch.$el);

        this.popUpSearch.once('select', function (model) {
            _this.select(model);
        });
    },
    select: function (model) {
        this.model = model;
        this.render();
        this.trigger('select', model);
    },

    remove: function () {
        Backbone.View.prototype.remove.apply(this, arguments);
    }
});

module.exports = CharacterSelectView;