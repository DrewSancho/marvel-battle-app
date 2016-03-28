var $ = require('jquery');
var Backbone = require('backbone');

var AppView = require('./components/AppView');
var AppRouter = require('./components/AppRouter');

var appView = new AppView();
appView.render();

// var router = new AppRouter();

document.body.appendChild(appView.el);

Backbone.history.start();