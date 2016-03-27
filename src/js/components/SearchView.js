var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

// var CharacterModel = require('CharacterModel');

var SearchView = Backbone.View.extend({
    className: 'searchView',
    template: _.template(`
        <input class="search" placeHolder="Name Starts With">
        <button class="submit">Search</button>
        <div id="results"></div>
    `),
    events: {
        'click .submit': 'performSearch',
        'keydown': 'onKeydown',
        'click img': 'deets'
    },
    initialize: function () {
        this.children = [];
        this.render();
        this.listenTo(this.collection, 'sync destroy', this.render);
    },
    performSearch: function () {
        var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + $('.search').val();
        $.getJSON(marvelAPI, {
            apikey: 'b28b7b0839633aa9e5ec65ba74293318'
        })
        .done(function (response) {
            var results = response.data.results;
            var resultsLen = results.length;
            var output = '<ul>';

            for (var i = 0; i < resultsLen; i++) {
                if (results.length > 0) {
                    var imgPath = results[i].thumbnail.path + '/portrait_xlarge' + '.' + results[i].thumbnail.extension;
                    output += '<li><img src="' + imgPath + '"><br>' + '<strong>' + results[i].name + '</strong>' + '<br>' + '' + results[i].description + '</li>';
                }
            }
            output += '</ul>';
            $('#results').empty();
            $('#results').append(output);
        });
    },
                //     var thumbnail = results[i].thumbnail.path + '/portrait_incredible' + '.' + results[i].thumbnail.extension;
                //     var name = results[i].name;
                //     var appearances = results[i].stories.available;
                //     var description = results[i].description;
                //     this.collection.create({
                //         thumbnail: thumbnail,
                //         name: name,
                //         appearances: appearances,
                //         bio: description
                //     });
                // }
    onKeydown: function (e) {
        if (e.keyCode === 13) {
            this.performSearch();
            $('input').val('');
        }
    },
    render: function () {
        this.$el.html(this.template());
    },
    deets: function () {
        
    }
});

module.exports = SearchView;