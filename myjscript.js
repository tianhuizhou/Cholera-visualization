d3.tsv("Cholera/choleraDeaths.tsv").then(function (data) {
  //console.log(data)
  let dateSet = _.map(_.pluck(data, 'Date'),function (date) {
      //console.log(date)
    return date
  })
  // console.log("test date set")
   //console.log(dateSet)

  let attackSet = _.map(_.pluck(data, 'Attack'),function (date) {
    //console.log(date)
    return date
  })
  // console.log("test attack set")
  // console.log(attackSet)

  let deathSet = _.map(_.pluck(data, 'Death'),function (date) {
    //console.log(date)
    return date
  })

  let totalAttack = []
  let totalDeath = []
  var info = [["Attack", "Death", "TOTAL"]];
  var dayMon = [["1854"]]
  for(let a = 0; a < (dateSet.length); a++){
    let num1 = parseInt(attackSet[a])

    let num2 = parseInt(deathSet[a])

    if (a == 0){
      totalAttack.push(num1)
      totalDeath.push(num2)
    } else {
      totalAttack.push((num1 + totalAttack[a-1]))
      totalDeath.push((num2 + totalDeath[a-1]))
    }


  }


  var headerColor = "grey";
  var rowEvenColor = "lightgrey";
  var rowOddColor = "white";
  var colorSet = []
  var temp = 0

  for(let a = 0; a < dateSet.length; a++) {

    if (temp == 0) {
      colorSet.push(rowOddColor)
      temp = 1
    } else {
      colorSet.push(rowEvenColor)
      temp = 0
    }
  }
  let dateModif = []
  for(let a = 0; a < dateSet.length; a++){
    var temp1 = dateSet[a].substr(0, 2)
    var temp2 = dateSet[a].substr(3, 3)
    if(temp2 == 'Aug'){
      temp2 = '08'
    } else {
      temp2 = '09'
    }
    var str = temp2 +'/'+ temp1
    dateModif.push(str)
  }


  var values1 = [dateModif, attackSet, deathSet, totalAttack, totalDeath]


  var data1 = [{
    type: 'table',
    columnwidth: [100,50,50,80,80],

    header: {
      values: [["<b>Date (in 1854)</b>"], ["<b>Attack</b>"],
        ["<b>Death</b>"], ["<b>Total Attack</b>"], ["<b>Total Death</b>"]],
      align: "center",
      line: {width: 1, color: 'black'},
      fill: {color: headerColor},
      font: {family: "Arial", size: 14, color: "white"}
    },
    cells: {
      values: values1,
      align: ["center", 'right'],
      line: {color: "black", width: 1},
      fill: {color: 'white'},
      font: {family: "Arial", size: 12, color: ["black"]}
    }
  }]

  var layoutTab = {
    title: 'Daily Records about Cholera Outbreak'
  }
  Plotly.newPlot('test2', data1, layoutTab);



  //Line Chart
  var xData = [dateModif, dateModif, dateModif, dateModif];

  var yData = [totalAttack, totalDeath, attackSet, deathSet];

  var colors = ['#990000', 'black', '#FF0000',
    'gray'
  ];

  var lineSize = [2, 2, 4, 2];

  var labels = ['Total Attack', 'Total Death', 'Attack', 'Death'];

  var data = [];

  for ( var i = 0 ; i < xData.length ; i++ ) {
    var result = {
      x: xData[i],
      y: yData[i],
      type: 'scatter',
      mode: 'lines+markers',
      name: labels[i],
      line: {
        color: colors[i],
        width: lineSize[i]
      }
    };
    var result2 = {
      x: [xData[i][0], xData[i][41]],
      y: [yData[i][0], yData[i][41]],
      type: 'scatter',
      name: labels[i],
      mode: 'markers',
      marker: {
        color: colors[i],
        size: 12
      }
    };
    data.push(result);
  }


  var layout = {
    showlegend: false,
    height: 550,
    width: 800,
    title: 'The Tendencies of Attack and Death by date in Cholera Outbreak',
    xaxis: {
      title: 'The date from 08/19 to 09/29 in 1854',
      showline: true,
      showgrid: true,
      showticklabels: true,
      linecolor: 'rgb(204,204,204)',
      linewidth: 2,
      autotick: false,
      ticks: 'outside',
      tickcolor: 'rgb(204,204,204)',
      tickwidth: 2,
      ticklen: 5,
      tickfont: {
        family: 'Arial',
        size: 12,
        color: 'rgb(82, 82, 82)'
      }
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false
    },
    autosize: false,
    margin: {
      autoexpand: false,
      l: 100,
      r: 20,
      t: 100
    },
    annotations: [
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.0,
        y: 1.0,
        xanchor: 'left',
        yanchor: 'bottom',
        text: 'Number',
        font:{
          family: 'Arial',
          size: 15,
          color: 'rgb(37,37,37)'
        },
        showarrow: false
      },
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.95,
        y: 0.0,
        xanchor: 'left',
        yanchor: 'top',
        text: 'Date',
        font:{
          family: 'Arial',
          size: 15,
          color: 'rgb(37,37,37)'
        },
        showarrow: false
      },
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.8,
        y: 1.1,
        xanchor: 'center',
        yanchor: 'top',
        text: 'Source: Pew Research Center & Storytelling with data',
        showarrow: false,
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(150,150,150)'
        }
      }
    ]
  };

  for( var i = 0 ; i < xData.length ; i++ ) {
    //var num = 2*i
    var result = {
      xref: 'paper',
      x: 0.05,
      y: i*30,
      xanchor: 'right',
      yanchor: 'middle',
      text: labels[i] +": "+ yData[i][0],
      showarrow: false,
      font: {
        family: 'Arial',
        size: 16,
        color: colors[i]
      }
    };
    var result2 = {
      xref: 'paper',
      x: 0.95,
      y: yData[i][41],
      xanchor: 'left',
      yanchor: 'middle',
      text: yData[i][41],
      font: {
        family: 'Arial',
        size: 16,
        color: 'black'
      },
      showarrow: false
    };

    layout.annotations.push(result, result2);
  }

  Plotly.newPlot('myDiv', data, layout);

})