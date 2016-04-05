var $ = require('jquery');
var Highcharts = require('highcharts');

var averageGraph = function (el, results) {
    console.log(el);
    var graph = new Highcharts.Chart({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            renderTo: el
        },
        title: {
            text: results.fighter1.name + '<br>vs<br>' + results.fighter2.name,
            align: 'center',
            verticalAlign: 'top',
            y: 40
        },
        plotOptions: {
            pie: {
                enableMouseTracking: false,
                colors: ['#ed1b24', '#61667b', '#ed1b24'],
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontSize: '15px',
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
                [results.fighter1.name + ' wins: ' + Math.floor(((results.fighter1.wins / results.data.length) * 100)) + '%', results.fighter1.wins],
                ['Draws: ' + Math.floor(((results.fighter1.draws / results.data.length) * 100)) + '%', results.fighter1.draws],
                [results.fighter2.name + ' wins: ' + Math.floor(((results.fighter2.wins / results.data.length) * 100)) + '%', results.fighter2.wins]
            ]
        }]
    });
    return graph;
};

module.exports = { averageGraph: averageGraph };