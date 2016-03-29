var $ = require('jquery');
var Highcharts = require('highcharts');

require('../../vendor/highcharts-more')(Highcharts);

var radarGraph = function (el, stats1, stats2) {
    console.log(el);
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: el,
            polar: true,
            type: 'line'
        },

        title: {
            text: stats1.name,
            x: -80
        },

        pane: {
            size: '85%'
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
            min: 0,
            max: 7
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

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{y}',
                    style: {
                        'fontSize': '11px',
                        'fontWeight': 'bold',
                        'textShadow': '0 0 6px contrast, 0 0 3px contrast',
                        'opacity': '1',
                        'visibility': 'visible'
                    }
                }
            }
        },

        series: [{
            name: stats1.name,
            data: [stats1.durability, stats1.energy, stats1.fighting, stats1.intelligence, stats1.speed, stats1.strength],
            pointPlacement: 'on'
        }
            // {
            //     name: 'stats2.name',
            //     data: [stats2.durability, stats2.energy, stats2.fighting, stats2.intelligence, stats2.speed, stats2.strength],
            //     pointPlacement: 'on'
            // }
        ]
    });

    return chart;
};

module.exports = { radarGraph: radarGraph };