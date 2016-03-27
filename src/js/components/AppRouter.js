var Backbone = require('backbone');

var ChararcterListView = require('./ChararcterListView');
var dispatcher = require('./dispatcher');
var DetailView = require('./DetailView');

var characterCollection = require('./CharacterCollection');
var characterView = require('./');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'index': 'index',
        'create': 'create',
        'character': 'character',
        'detail/:id': 'detail',
        'battle/:id/:id': 'battle'
    },
    index: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new characterView({collection: characterCollection}));
    },
    search: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new ChararcterListView({collection: characterCollection}));
    },
    detail: function (id) {
        characterCollection.fetch({
            success: function () {
                var model = characterCollection.find({ id: parseInt(id) });
                dispatcher.trigger('app:show', new DetailView({ model: model }));
            }
        });
    },
    battle: function (id) {
        characterCollection.fetch();
    }
});

module.exports = AppRouter;