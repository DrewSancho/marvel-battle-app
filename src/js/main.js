var $ = require('jquery');
var Backbone = require('backbone');
var SearchView = require('./components/SearchView');
var CharacterListView = require('./components/CharacterListView');
var CharacterCollection = require('./components/CharacterCollection');

var AppView = require('./components/AppView');
var AppRouter = require('./components/AppRouter');

var searchesCollection = require('./components/SearchesCollection');

var appView = new AppView();
// var searchView = new SearchView();
// var characterListView = new CharacterListView({ collection: CharacterCollection });

appView.render();
// searchView.render();
// characterListView.render();

var router = new AppRouter();

// router.navigate('battle/091238/29308')
// will update without triggering a hashchange event, meaning the route won't
// fire.

document.body.appendChild(appView.el);
// document.body.appendChild(characterListView.el);

Backbone.history.start();