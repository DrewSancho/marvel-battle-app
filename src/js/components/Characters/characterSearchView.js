var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var SearchView = require('./SearchView');

var characterSearchView = Backbone.View.extend({

    template: _.template(require('./characterSearchView')),

    initialize: function (options) {
        this.characterCollection = options.characterCollection;
        this.listenTo(this.characterCollection, 'sync', this.render);
        this.searchView = new SearchView({collection: this.characterCollection});
    },

    render: function () {
        this.$el.html(this.template());
        this.characterCollection.render();
        this.$('."search-results-slot"').append(this.characterCollection.$el);
    }

});