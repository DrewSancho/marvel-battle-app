var Backbone = require('backbone');

var ChararcterListView = require('./CharacterListView');
var dispatcher = require('./dispatcher');
var DetailView = require('./DetailView');

var characterCollection = require('./CharacterCollection');
var CharacterView = require('./CharacterView');
var SearchView = require('./SearchView');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'index': 'index',
        'create': 'create',
        'character': 'character',
        'detail/:id': 'detail',
        'battle/:id/:id': 'battle',
        'search': 'search'
    },
    index: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new CharacterView({collection: characterCollection}));
    },
    search: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new characterCollection({collection: characterCollection}));
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
        characterCollection.fetch({
            success: function () {
                var model = characterCollection.find({ id: parseInt(id) });
                dispatcher.trigger('app:show', new BattleView());
            }
        });
    }
});

module.exports = AppRouter;