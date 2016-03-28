var $ = require('jquery');

var radarGraph = $(function () {
    $('#container').highcharts({
        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Abomination vs Absorbing Man',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: ['Durability', 'Energy', 'Fighting', 'Intelligence',
            'Speed', 'Strength'
      ],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{
            name: 'Abomination',
            data: [6, 1, 2, 2, 2, 7],
            pointPlacement: 'on'
        }, {
            name: 'Absorbing Man',
            data: [6, 4, 6, 2, 3, 6],
            pointPlacement: 'on'
        }]
    });
});

module.exports = radarGraph;