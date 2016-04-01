var $ = require('jquery');
var Backbone = require('backbone');
var SearchView = require('./components/Characters/SearchView');
var CharacterListView = require('./components/Characters/CharacterListView');
var CharacterCollection = require('./components/Characters/CharacterCollection');

var AppView = require('./components/App/AppView');
var AppRouter = require('./components/AppRouter');

var searchesCollection = require('./components/Dashboard/SearchesCollection');

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

// intercepts click events to work with button.
$(window).on('click', function (e) {
    e.preventDefault();

    var $el = $(e.target);

    if ($el.is('[data-route]')) {
        Backbone.history.navigate($el.data('route'), { trigger: true });
    }
});

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