var Hightcharts = require('../../../vendor/highcharts-more')(Hightcharts);
var $ = require('jquery');
var averageGraph = function (results, stats1, stats2) {
    var graph = new Hightcharts.Chart({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            renderTo: 'container'
        },
        title: {
            text: 'stats1.name<br>vs<br>stats2.name',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        plotOptions: {
            pie: {
                enableMouseTracking: false,
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Battle Outcome',
            innerSize: '50%',
            data: [
                [results.stats1.name + ': ' + (results.stats1.wins / $('.fight-num').val() * 100) + '%', results.stats1.wins],
                ['Draws: ' + results.stats1.draws + '%', results.stats1.draws],
                [results.stats2.name + ': ' + results.stats2.wins + '%', results.stats2.wins]
            ]
        }]
    });
    return graph;
};

module.exports = { averageGraph: averageGraph };