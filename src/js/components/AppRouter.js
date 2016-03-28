var Backbone = require('backbone');

var CharacterListView = require('./CharacterListView');
var dispatcher = require('./dispatcher');
var DetailView = require('./DetailView');
var CharacterModel = require('./CharacterModel');
var characterCollection = require('./CharacterCollection');
var CharacterView = require('./CharacterView');
var BattleView = require('./BattleView');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'index': 'index',
        'character': 'character',
        'detail/:id': 'detail',
        'battle/:id/:id': 'battle'
    },
    index: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new CharacterView({ collection: characterCollection }));
    },
    search: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', characterCollection({ collection: characterCollection }));
    },
    detail: function (id) {
        var model = new CharacterModel({ id: id });

        model.fetch({
            success: function () {
                dispatcher.trigger('app:show', new DetailView({ model: model }));
            }
        });

        // characterCollection.fetch({
        //     success: function () {
        //         var model = characterCollection.find({ id: parseInt(id) });
        //     }
        // });
    },
    character: function () {
        characterCollection.fetch({
            success: function () {
                dispatcher.trigger('app:show', new CharacterListView({collection: characterCollection}));
            }
        });
    },
    battle: function (id) {
        var model = new CharacterModel({ id: id });

        model.fetch({
            success: function () {
                dispatcher.trigger('app:show', new BattleView({ model: model }));
            }
        });
        // characterCollection.fetch({
        //     success: function () {
        //         var model = characterCollection.find({ id: parseInt(id) });
        //         dispatcher.trigger('app:show', new BattleView({model: model}));
        //     }
        // });
    }
});

module.exports = AppRouter;