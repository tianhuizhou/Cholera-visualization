Plotly.d3.csv('Cholera/choleraPumpLocations.csv', function (err, data_pump) {
  Plotly.d3.csv('Cholera/choleraDeathLocations.csv', function (err, data_death) {
    let pump_lati = _.map(_.pluck(data_pump, 'lati'), function (x) {

      return x
    });
    let pump_long = _.map(_.pluck(data_pump, 'long'), function (x) {

      return x
    });
    let death_lati = _.map(_.pluck(data_death, 'lati'), function (x) {

      return x
    });
    let death_long = _.map(_.pluck(data_death, 'long'), function (x) {

      return x
    });
    let death_num = _.map(_.pluck(data_death, 'num'), function (x) {
      x = parseInt(x)
      return x
    });

    var data = [
      {
        type: "scattermapbox",
        name: "Pump",
        lat: pump_lati,
        lon: pump_long,
        marker: {
          color: "#0099EE",
          size: 16,
        },
      },
      {
        type: "scattermapbox",
        name: "Death",
        text: _.map(death_num, (num) => ('Death: '+ num)),
        lat: death_lati,
        lon: death_long,
        marker: {
          color: "#EE0000",
          opacity: 0.9,
          size: _.map(death_num, (num) => (8.5 * Math.sqrt(num)))}
      }
    ];

    var layout = {
      dragmode: "zoom",
      mapbox: { style: "stamen-terrain", center: { lat: 51.513, lon: -0.137 }, zoom: 14.5 },
      margin: { r: 0, t: 0, b: 0, l: 0 },
      showlegend:true,
      legend: {
        x: 0,
        xanchor: 'left',
        y: 0.9
      }
    };

    Plotly.newPlot("mymap", data, layout, { showLink: false });
  })
});