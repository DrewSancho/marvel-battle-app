var Backbone = require('backbone');

var CharacterModel = Backbone.Model.extend({

    url: function () {
        return 'https://gateway.marvel.com/v1/public/characters/' + this.get('id') + '?apikey=b28b7b0839633aa9e5ec65ba74293318';
    },
    parse: function (response) {
        return response.data ? response.data.results[0] : response;
    },

    getImage: function () {
        var thumbnail = this.get('thumbnail');
        return thumbnail.path + '.' + thumbnail.extension;
    }
});

module.exports = CharacterModel;