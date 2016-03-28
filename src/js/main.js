var $ = require('jquery');
var Backbone = require('backbone');
var SearchView = require('./components/SearchView');
var CharacterListView = require('./components/CharacterListView');
var CharacterCollection = require('./components/CharacterCollection');

var AppView = require('./components/AppView');
var AppRouter = require('./components/AppRouter');

var appView = new AppView();
// var searchView = new SearchView();
// var characterListView = new CharacterListView({ collection: CharacterCollection });

appView.render();
// searchView.render();
// characterListView.render();

var router = new AppRouter();

document.body.appendChild(appView.el);
// document.body.appendChild(characterListView.el);

Backbone.history.start();