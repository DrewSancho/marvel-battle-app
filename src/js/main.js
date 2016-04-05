var $ = require('jquery');
var Backbone = require('backbone');

var AppView = require('./components/App/AppView');
var AppRouter = require('./components/AppRouter');

var Highcharts = require('highcharts');

require('../vendor/highcharts-more')(Highcharts);

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

appView.render();

var router = new AppRouter();

document.body.appendChild(appView.el);

Backbone.history.start();