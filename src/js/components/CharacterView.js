var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var CharacterView = Backbone.View.extend({
    events: {
        'click .charImage': 'onClick'
    },

    onClick: function () {
        window.location.hash = 'detail/' + this.model.get('id');
        // var name = this.model.get('name');
        // var characterId = this.model.get('id');
        // this.model.save({
        //     name: name,
        //     characterId: characterId
        // });
        // console.log(characterId);
    },

    template: _.template(require('./characterView.html')),

    initialize: function () {

    },

    render: function (stats) {
        this.$el.html(this.template({
            character: this.model.attributes,
            stats: stats
        }));
    }

});

module.exports = CharacterView;