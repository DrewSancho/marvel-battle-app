var Backbone = require('backbone');
var $ = require('jquery');

var CharacterListView = require('./CharacterListView');
var dispatcher = require('./dispatcher');
var DetailView = require('./DetailView');
var CharacterModel = require('./CharacterModel');
var characterCollection = require('./CharacterCollection');
// var CharacterView = require('./CharacterView');
var BattleView = require('./BattleView');
var PopUpSearch = require('./PopUpSearch');
var statsCache = require('./statsCache');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'dashboard',
        'index': 'index',
        'character': 'character',
        'character/:filter': 'filter',
        'detail/:id': 'detail',
        'battle': 'battle', // no characters selected
        'battle/:id1': 'battle', // one character selected
        'battle/:id1/:id2': 'battle', // both characters selected
        'battle/search': 'battleSearch',
        'battle/:id/:id/battle-average': 'battleAverageView',
        'battle/:id/:id/battle2': 'battle2'
    },
    index: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new CharacterListView({ collection: characterCollection }));
    },
    search: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', characterCollection({ collection: characterCollection }));
    },
    detail: function (id) {
        id = parseInt(id);

        var model = new CharacterModel({ id: id });

        model.fetch({
            success: function () {
                statsCache.get(id, function (stats) {
                    dispatcher.trigger('app:show', new DetailView({ model: model, stats: stats }));
                });
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

    filter: function (filter) {
        characterCollection.fetch({ data: { nameStartsWith: filter },
            success: function (view) {
                dispatcher.trigger('app:show', new CharacterListView({ collection: characterCollection }));
            }
        });
    },

    battle: function (id1, id2) {
        var model1, model2;
        // characterCollection.fetch();

        // If the route was triggered with no character ids
        if (!id1 && !id2) {
            return dispatcher.trigger('app:show', new BattleView());
        }

        model1 = new CharacterModel({ id: id1 });

        // If the route was triggered with one character id
        if (!id2) {
            return model1.fetch({
                success: function () {
                    dispatcher.trigger('app:show', new BattleView({ character1: model1 }));
                }
            });
        }

        // If the route was triggered with two character ids
        model2 = new CharacterModel({ id: id2 });

        return model1.fetch({
            success: function () {
                model2.fetch({
                    success: function () {
                        dispatcher.trigger('app:show', new BattleView({
                            character1: model1,
                            character2: model2
                        }));
                    }
                });
            }
        });

        // var model = new CharacterModel({id: id});
        // var model2 = new CharacterModel({id: id});

        // model.fetch({
        //     success: function () {
        //         dispatcher.trigger('app:show', new BattleView({ model: model }));
        //     }
        // });

        // model2.fetch({
        //     success: function () {
        //         dispatcher.trigger('app:show', new BattleView({ model: model2 }));
        //     }
        // });
    },

    battleSearch: function () {
        characterCollection.fetch();
        dispatcher.trigger('app:show', new PopUpSearch({ collection: characterCollection }));
    }
});

module.exports = AppRouter;