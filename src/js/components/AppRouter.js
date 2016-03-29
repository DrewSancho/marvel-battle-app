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
        '': 'dashboard',
        'index': 'index',
        'character': 'character',
        'character/filter': 'filter',
        'detail/:id': 'detail',
        'battle': 'battle', // no characters selected
        'battle/:id': 'battle', // one character selected
        'battle/:id/:id': 'battle', // both characters selected
        'battle/search': 'battleSearch',
        'battle/:id/:id/battle-average': 'battleAverageView',
        'battle/:id/:id/battle2': 'battle2'
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
    },
    character: function () {
        characterCollection.fetch({
            success: function () {
                dispatcher.trigger('app:show', new CharacterListView({collection: characterCollection}));
            }
        });
    },

    filter: function () {
        characterCollection.fetch({
            success: function () {
                dispatcher.trigger('app:show', new CharacterListView({collection: characterCollection}));
            }
        });
    },

    battle: function (id) {
        var model = new CharacterModel({});
        var model2 = new CharacterModel({});

        model.fetch({
            success: function () {
                dispatcher.trigger('app:show', new BattleView({ model: model }));
            }
        });

        model2.fetch({
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
    },

    battleSearch: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', characterCollection({ collection: characterCollection }));
    }
});

module.exports = AppRouter;