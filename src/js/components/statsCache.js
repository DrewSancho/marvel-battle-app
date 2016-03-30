var $ = require('jquery');
var cache = window.localStorage.statsCache
    ? JSON.parse(window.localStorage.statsCache)
    : {};

function set (id, stats) {
    cache[id] = stats;
    window.localStorage.statsCache = JSON.stringify(cache);
}

function get (id, callback) {
    var cached = cache[id];

    if (cached === undefined) {
        $.get({
            url: '/api/stats/' + id,
            success: function (stats) {
                set(id, stats);
                callback(stats);
            },
            error: function () {
                // set(id, null);
                callback(null);
            }
        });
    } else {
        callback(cached);
    }
}

module.exports = {
    get: get
};

// statsCache.get(102394, function (stats) {})