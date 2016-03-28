var Backbone = require('backbone');
var CharacterCollection = require('./CharacterCollection');


var PopUpSearchView = Backbone.View.extend({
    className: 'pop-up-search',

    template: _.template(`
        <input class="search" placeHolder="Name Starts With">
        <button class="submit">Search</button>
    `),
    events: {
        'click .submit': 'search',
        'keydown': 'onKeydown'
    },
    search: function () {
        CharacterCollection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
        $('input').val('');
    },
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            CharacterCollection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
            $('input').val('');
        }
    },
    render: function () {
        this.$el.html(this.template());
    }
});