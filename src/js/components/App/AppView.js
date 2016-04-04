var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var NavView = require('./NavView');
var dispatcher = require('../Events/dispatcher');

var AppView = Backbone.View.extend({
    clssName: 'app',

    template: _.template(require('./appView.html')),

    initialize: function () {
        this.navView = new NavView();
        this.listenTo(dispatcher, 'app:show', this.show);
    },

    render: function () {
        this.$el.html(this.template());
        this.$('.navView').append(this.navView.$el);
        this.navView.render();
    },

    remove: function () {
        this.navView.remove();
        this.pageView.remove();
        // this.footerView.remove();
        Backbone.View.prototype.remove.call(this);
    },

    show: function (view) {
        if (this.child) {
            this.child.remove();
        }
        view.render();
        this.$('.pageView').append(view.$el);
        this.child = view;
    }
});

module.exports = AppView;