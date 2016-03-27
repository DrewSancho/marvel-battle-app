var Backbone = require('backbone');

var IndexView = require('./IndexView');
var NewRunPage = require('./NewRunPage');
var dispatcher = require('./dispatcher');
var DetailView = require('./DetailView');

var characterCollection = require('./CharacterCollection');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'create': 'create',
        'search': 'search',
        'detail/:id': 'detail',
        'battle/:id/:id': 'battle'
    },
    index: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new IndexView({collection: characterCollection}));
    },
    search: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new NewRunPage({collection: characterCollection}));
    },
    detail: function (id) {
        characterCollection.fetch({
            success: function () {
                var model = characterCollection.find({ id: parseInt(id) });
                dispatcher.trigger('app:show', new DetailView({ model: model }));
            }
        });
    }
});

module.exports = AppRouter;