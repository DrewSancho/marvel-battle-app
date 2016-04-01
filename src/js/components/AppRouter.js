var Backbone = require('backbone');
var $ = require('jquery');

var CharacterListView = require('./Characters/CharacterListView');
var dispatcher = require('./Events/dispatcher');
var DetailView = require('./Characters/DetailView');
var CharacterModel = require('./Characters/CharacterModel');
var characterCollection = require('./Characters/CharacterCollection');
var searchesCollection = require('./Dashboard/SearchesCollection');
var FavoriteCharacterCollection = require('./Dashboard/FavoriteCharacterCollection');
var BattleView = require('./Battle/BattleView');
var PopUpSearch = require('./PopUpSearch/PopUpSearch');
var statsCache = require('./Utilities/statsCache');
var DashboardView = require('./Dashboard/DashboardView');
var BattleAverageView = require('./Battle/BattleAverageView');

var AppRouter = Backbone.Router.extend({
    routes: {
        'index': 'index',
        'character': 'character',
        'character/:filter': 'character',
        'detail/:id': 'detail',
        'battle': 'battle', // no characters selected
        'battle/:id1': 'battle', // one character selected
        'battle/:id1/:id2': 'battle', // both characters selected
        'battle/search': 'battleSearch',
        'battle/:id1/:id2/battle-average': 'battleAverage',
        'battle/:id/:id/battle2': 'battle2'
    },
    index: function () {
        var favoriteCharacterCollection = new FavoriteCharacterCollection();

        favoriteCharacterCollection.fetch();
        searchesCollection.fetch();
        
        dispatcher.trigger('app:show', new DashboardView({
            searchesCollection: searchesCollection,
            favoriteCharacterCollection: favoriteCharacterCollection
        }));
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
    character: function (filter) {
        var data = filter ? { nameStartsWith: filter } : {};
        characterCollection.fetch({
            data: data,
            success: function () {
                dispatcher.trigger('app:show', new CharacterListView({ collection: characterCollection }));
            }
        });
    },

    battle: function (id1, id2) {
        var model1, model2;

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
    },

    battleAverage: function (id1, id2) {
        var model1 = new CharacterModel({ id: id1 });
        var model2 = new CharacterModel({ id: id2 });
        model1.fetch({
            success: function () {
                model2.fetch({
                    success: function () {
                        dispatcher.trigger('app:show', new BattleAverageView({
                            character1: model1,
                            character2: model2
                        }));
                    }
                });
            }
        });
    }
});

module.exports = AppRouter;