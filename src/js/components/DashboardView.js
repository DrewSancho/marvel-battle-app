var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var dispatcher = require('./dispatcher');

var DashboardView = Backbone.View.extend({
    className: 'dashboardView',
    template: _.template()
})