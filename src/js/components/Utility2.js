var Highcharts = require('highcharts');

require('../../vendor/highcharts-more')(Highcharts);

var radarGraph = function (el, stats1, stats2) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: el,
            polar: true,
            type: 'line'
        },

        title: {
            text: "stats1.name 'vs' stats2.name",
            x: -80
        },

        pane: {
            size: '85%'
        },

        xAxis: {
            categories: ['Durability', 'Energy', 'Fighting', 'Intelligence', 'Speed', 'Strength'],
            lineWidth: 0,
            gridLineInterpolation: 'circle',
            pointPlacement: 'on'
        },

        yAxis: {
            gridLineInterpolation: 'circle',
            lineWidth: 0,
            min: 0,
            max: 7,
            allowDecimals: false,
            tickInterval: 2,
            pointPlacement: 'on'
        },

        legend: {
            enabled: false
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },

        series: [{
            name: stats1.name,
            data: [stats1.durability, stats1.energy, stats1.fighting, stats1.intelligence, stats1.speed, stats1.strength],
            color: '#ed1b24',
            dataLabels: {
                enabled: true,
                show: 'y.value',
                style: {
                    visibility: 'visible',
                    opacity: 1
                }
            }
        },
            {
                name: stats2.name,
                data: [stats2.durability, stats2.energy, stats2.fighting, stats2.intelligence, stats2.speed, stats2.strength],
                color: '#3a405a',
                show: 'y.value',
                style: {
                    visibility: 'visible',
                    opacity: 1
                }
            }
        ]
    });

    return chart;
};

module.exports = { radarGraph: radarGraph };