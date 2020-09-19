Promise.all([
  d3.csv("Cholera/choleraDeathLocations.csv"),
  d3.csv("Cholera/choleraPumpLocations.csv"),
]).then(function(files) {

  console.log("js3 lalalala");
  let xSet = _.map(_.pluck(files[1], 'long'),function (x) {

    return x
  });

  let ySet = _.map(_.pluck(files[1], 'lati'),function (y) {

    return y
  });
//read / organize data

  console.log(xSet);
  console.log(ySet);

  let numbers = _.map(_.pluck(files[0], 'num'),function (n) {

    return n
  });

  let xSet2 = _.map(_.pluck(files[0], 'long'),function (x) {

    return x
  });

  let ySet2 = _.map(_.pluck(files[0], 'lati'),function (y) {

    return y
  });



//implement leaflet map
  var mymap = L.map('mapid').setView([51.510, -0.135], 13);
  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PrivuiGzyFky7CGnwdRr',{
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
  }).addTo(mymap);

  for(let a = 0; a < xSet.length; a++){
    L.marker([ySet[a], xSet[a]]).bindPopup("<b>Hello!</b><br>I am a Pump.").openPopup().addTo(mymap);
  }

  for(let a = 0; a < numbers.length; a++){
    var numColor = "a"
    if(numbers[a] < 5){
      numColor = "#FD8D3C"
    } else if (numbers[a] >= 5 && numbers[a] < 11){
      numColor = "#E31A1C"
    } else {
      numColor = "#800026"
    }
    L.circle([ySet2[a], xSet2[a]], {
      color: numColor,
      fillColor: numColor,
      fillOpacity: 1,
      radius: numbers[a]/1.52
    }).bindPopup("Total Death: " + numbers[a]).addTo(mymap);
  }

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 10],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      console.log("I am here")


      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(mymap);


}).catch(function(err) {
  // handle error here
  console.log("error")
})

function getColor(d) {
  return d > 10 ? '#800026' :
      d > 5  ? '#E31A1C' :
          '#FD8D3C';
}
