var $ = require('jquery');
var Backbone = require('backbone');

var SearchView = require('./components/SearchView');
// var AppView = require('./components/AppView');
// var AppRouter = require('./components/AppRouter');

// var appView = new AppView();
var searchView = new SearchView();
// appView.render();
searchView.render();
// var router = new AppRouter();

document.body.appendChild(searchView.el);

// Backbone.history.start();