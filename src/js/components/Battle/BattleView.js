// This view will have two character models, img and name.
// footer with two buttons
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var CharacterSelectView = require('./CharacterSelectView');
var radarGraph = require('../Utilities/utility').radarGraph;
var statsCache = require('../Utilities/statsCache');
var dispatcher = require('../Events/dispatcher');

var BattleView = Backbone.View.extend({
    className: 'battle-view',

    template: _.template(require('./battleView.html')),

    initialize: function (options) {
        options = options || {};
        this.character1 = options.character1;
        this.character2 = options.character2;
        this.characterSelect1 = new CharacterSelectView({ model: this.character1 });
        this.characterSelect2 = new CharacterSelectView({ model: this.character2 });
        this.listenTo(this.characterSelect1, 'select', this.updateBattle1);
        this.listenTo(this.characterSelect2, 'select', this.updateBattle2);
    },

    render: function () {
        this.$el.html(this.template());
        this.characterSelect1.render();
        this.characterSelect2.render();
        this.$('.characterSelect-1').append(this.characterSelect1.$el);
        this.$('.characterSelect-2').append(this.characterSelect2.$el);
        // this.$('.characterName-1').append(this.character1.get('name'));
        // this.$('.characterName-2').append(this.character2.get('name'));
        if (this.character1) {
            this.updateBattle1(this.character1);
        }

        if (this.character2) {
            this.updateBattle2(this.character2);
        }
    },

    renderGraph: function () {
        radarGraph(this.$('#container')[0], this.stats1, this.stats2);
    },

    events: {
        'click .select-left': 'selectLeft',
        'click .select-right': 'selectRight',
        'click .battle1': 'battle1',
        'click .battle2': 'battle2',
        'click .randomizer': 'random'
    },

    selectLeft: function () {
    },

    selectRight: function () {
        // window.location.hash = '/battle/search';
    },

    battle1: function (e) {
        window.location.hash = 'battle/' + this.character1.get('id') + '/' + this.character2.get('id') + '/battle-average';
    },

    battle2: function () {
        // single battle view
        window.location.hash = 'battle/' + this.character1.get('id') + '/' + this.character2.get('id') + '/battle-once';
    },

    updateBattle1: function (model) {
        var _this = this;
        this.character1 = model;
        $('.characterSelect-1').animateCss('slideInLeft');
        statsCache.get(model.get('id'), function (stats) {
            _this.stats1 = stats;
            _this.renderGraph();
            _this.$('.characterName-1').empty();
            _this.$('.characterName-1').append(model.get('name'));
        });
    },

    updateBattle2: function (model) {
        var _this = this;
        this.character2 = model;
        $('.characterSelect-2').animateCss('slideInRight');
        this.updateUrl();
        statsCache.get(model.get('id'), function (stats) {
            _this.stats2 = stats;
            _this.renderGraph();
            _this.$('.characterName-2').empty();
            _this.$('.characterName-2').append(model.get('name'));
        });
    },
    updateUrl: function () {
        var url = 'battle/';

        if (this.character1) {
            url += this.character1.get('id') + '/';
        }

        if (this.character2) {
            url += this.character2.get('id');
        }
        if (this.character1 && this.character2 || this.character2 && this.character1) {
            $('.vs').html('VS');
            $('.vs').animateCss('bounceInDown');
        }

        Backbone.history.navigate(url);
    }

});

module.exports = BattleView;