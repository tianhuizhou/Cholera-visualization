d3.tsv("Cholera/naplesCholeraAgeSexData.tsv").then(function (data) {
  let ageSet = _.map(_.pluck(data, 'age'),function (age) {
    //console.log(date)
    return age
  })
  //console.log("Test for part 2")
  //console.log(ageSet)

  let maleSet = _.map(_.pluck(data, 'male'),function (male) {
    //console.log(date)
    return male
  })

  //console.log(maleSet)

  let femaleSet = _.map(_.pluck(data, 'female'),function (female) {
    //console.log(date)
    return female
  })

  //console.log(femaleSet)

  var headerColor = "grey";
  var rowEvenColor = "lightgrey";
  var rowOddColor = "white";
  var colorSet = []
  var temp = 0
 for(let a = 0; a < ageSet.length; a++) {

    if (temp == 0) {
      colorSet.push(rowOddColor)
      temp = 1
    } else {
      colorSet.push(rowEvenColor)
      temp = 0
    }


 }


  var values1 = [ageSet, maleSet, femaleSet]


  var data3 = [{
    type: 'table',
    header: {
      values: [["<b>Age</b>"], ["<b>Male</b>"],
        ["<b>Female</b>"]],
      align: "center",
      line: {width: 1, color: 'black'},
      fill: {color: headerColor},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: values1,
      align: "center",
      line: {color: "black", width: 1},
      fill: {color: [colorSet]},
      font: {family: "Arial", size: 11, color: ["black"]}
    }
  }]

  Plotly.newPlot('table2', data3);


 // bar charts of age for male and female


  var trace1 = {
    x: ageSet,
    y: maleSet,
    name: 'Male',
    type: 'bar'
  };

  var trace2 = {
    x: ageSet,
    y: femaleSet,
    name: 'Female',
    type: 'bar'
  };

  var data_gender = [trace1, trace2];

  var layout_bar = {
    xaxis: {title: 'Age - X axis'},
    yaxis: {title: 'Deaths - Y axis'},
    barmode: 'group',
    title: "Cholera Deaths about Age & Sex"
  };

  Plotly.newPlot('barChart', data_gender, layout_bar);



})

//UK 1851 data:

d3.csv("Cholera/UKcensus1851.csv").then(function (data) {
  let ageSet = _.map(_.pluck(data, 'age'),function (age) {
    //console.log(date)
    return age
  })
  // console.log("Test for part 3")
  // console.log(ageSet)

  let maleSet = _.map(_.pluck(data, 'male'),function (male) {
    //console.log(date)
    return male
  })
  // console.log(maleSet)

  let femaleSet = _.map(_.pluck(data, 'female'),function (female) {
    //console.log(date)
    return female
  })
  // console.log(femaleSet)

  var totalMember = []

  for(let a = 0; a < ageSet.length;a++){
    let num1 = parseInt(maleSet[a])
    let num2 = parseInt(femaleSet[a])

    totalMember.push((num1+num2))
  }

  var headerColor = "grey";
  var rowEvenColor = "lightgrey";
  var rowOddColor = "white";
  var colorSet = []
  var temp = 0


  ageSet.push("Overall ages")
  var tempNum1 = 0
  var tempNum2 = 0
  var tempNum3 = 0
  for(let a = 0; a< maleSet.length; a++){
    let num1 = parseInt(maleSet[a])
    let num2 = parseInt(femaleSet[a])
    tempNum1 += num1
    tempNum2 += num2
    tempNum3 += totalMember[a]
  }

  maleSet.push(tempNum1.toString())
  femaleSet.push(tempNum2.toString())
  totalMember.push(tempNum3)

  for(let a = 0; a < ageSet.length; a++) {

    if (temp == 0) {
      colorSet.push(rowOddColor)
      temp = 1
    } else {
      colorSet.push(rowEvenColor)
      temp = 0
    }
  }
  var values1 = [ageSet, maleSet, femaleSet, totalMember]


  var data4 = [{
    type: 'table',
    header: {
      values: [["<b>Age</b>"], ["<b>Male</b>"],
        ["<b>Female</b>"],["<b>Total</b>"]],
      align: "center",
      line: {width: 1, color: 'black'},
      fill: {color: headerColor},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: values1,
      align: "center",
      line: {color: "black", width: 1},
      fill: {color: [colorSet]},
      font: {family: "Arial", size: 11, color: ["black"]}
    }
  }]

  Plotly.newPlot('table3', data4);


  //a pie for age and men
  var pieMaleSet = []
  var pieAgeSet = []
  var pieFemaleSet = []

  for(let a = 0; a < (ageSet.length - 1) ; a++){
    pieAgeSet.push(ageSet[a])
    pieMaleSet.push(maleSet[a])
    pieFemaleSet.push(femaleSet[a])
  }
  var data5 = [{
    values: pieMaleSet,
    labels: pieAgeSet,
    domain: {column: 0},
    name: 'Male Emissions',
    textposition: 'inside',
    hoverinfo: 'label+percent+value',
    hole: .4,
    type: 'pie'
  },{
    values: pieFemaleSet,
    labels: pieAgeSet,
    text: 'Female',
    textposition: 'inside',
    domain: {column: 1},
    name: 'Female Emissions',
    hoverinfo: 'label+percent+value',
    hole: .4,
    type: 'pie'
  }];

  var layout5 = {
    title: ' Age Distributions in UK 1851',
    annotations: [
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'Male',
        x: 0.17,
        y: 0.5
      },
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'Female',
        x: 0.85,
        y: 0.5
      }
    ],
    height: 450,
    width: 700,
    showlegend: false,
    grid: {rows: 1, columns: 2}
  };

  Plotly.newPlot('Male&FemaleDis', data5, layout5);








  //bar charts for age and man/women in one
  var trace3 = {
    x: ageSet,
    y: pieMaleSet,
    name: 'Male',
    type: 'bar'
  };

  var trace4 = {
    x: ageSet,
    y: pieFemaleSet,
    name: 'Female',
    type: 'bar'
  };

  var data_gender = [trace3, trace4];

  var layout_bar = {
    xaxis: {title: 'Age - X axis'},
    barmode: 'group',
    title: "UK Gender Ratio in 1851"
  };

  Plotly.newPlot('barChart2', data_gender, layout_bar);


  //pie for woman and man overall

  var maleNum = maleSet[maleSet.length - 1]
  var femaleNum = femaleSet[femaleSet.length - 1]


  var data7 = [{
    type: "pie",
    title: "UK Gender Ratio in 1851",
    values: [maleNum, femaleNum],
    labels: ["Male", "Female"],
    textinfo: "label+percent",
    insidetextorientation: "radial"
  }]

  var layout7 = [{
    height: 700,
    width: 700
  }]

  Plotly.newPlot('pieOverall', data7, layout7)



})