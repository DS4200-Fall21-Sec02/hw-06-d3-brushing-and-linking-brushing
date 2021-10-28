var margin = { top: 10, right: 30, bottom: 50, left: 60 },
width = 460 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// append svg object to the body of the page to house Scatterplot 1
var svg1 = d3
.select("#dataviz_brushScatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Scatterplot 2
var svg2 = d3
.select("#dataviz_brushScatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Bar chart
var svg3 = d3
.select("#dataviz_brushBar")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define color scale
var color = d3
.scaleOrdinal()
.domain(["setosa", "versicolor", "virginica"])
.range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Read data and make plots
d3.csv("data/iris.csv").then((data) => {

  //Scatterplot 1
  {
    var xKey1 = "Sepal_Length";
    var yKey1 = "Petal_Length";

    //Add X axis
    var x1 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[xKey1])))
    .range([0, width]);
    svg1
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1))
    .call((g) =>
    g
    .append("text")
    .attr("x", width)
    .attr("y", margin.bottom - 4)
    .attr("fill", "currentColor")
    .attr("text-anchor", "end")
    .text(xKey1)
  );

  //Add Y axis
  var y1 = d3
  .scaleLinear()
  .domain(d3.extent(data.map((val) => val[yKey1])))
  .range([height, 0]);
  svg1
  .append("g")
  .call(d3.axisLeft(y1))
  .call((g) =>
  g
  .append("text")
  .attr("x", -margin.left)
  .attr("y", 10)
  .attr("fill", "currentColor")
  .attr("text-anchor", "start")
  .text(yKey1)
);

// Add dots
var myCircle1 = svg1
.append("g")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("id", (d) => d.id)
.attr("cx", function (d) {
  return x1(d[xKey1]);
})
.attr("cy", function (d) {
  return y1(d[yKey1]);
})
.attr("r", 8)
.style("fill", function (d) {
  return color(d.Species);
})
.style("opacity", 0.5);

//adds brush
var brush1 = d3.brush()
.extent( [ [0,0], [width,height] ] )
.on("start brush", updateChart1);
//call the brush
svg1.call(brush1)
//clears the brush when clicked
svg1.on('click', clear());

function clear() {
  svg1.call(brush1.move, null);
}

//updates svg2 by highlighting circle
function updateChart1(brushEvent) {
  //TODO: Check all the circles that are within the brush region in Scatterplot 1
  extent = brushEvent.selection;
  myCircle1.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
  svg2.selectAll("circle").classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
  }
}});


//TODO: Define a brush

//TODO: Add brush to the svg



//TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)
d3.csv("data/iris.csv").then((data) => {

  //Scatterplot 1
  {
    var xKey1 = "Sepal_Width";
    var yKey1 = "Petal_Width";

    //Add X axis
    var x1 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[xKey1])))
    .range([0, width]);
    svg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1))
    .call((g) =>
    g
    .append("text")
    .attr("x", width)
    .attr("y", margin.bottom - 4)
    .attr("fill", "currentColor")
    .attr("text-anchor", "end")
    .text(xKey1)
  );


  //Add Y axis
  var y1 = d3
  .scaleLinear()
  .domain(d3.extent(data.map((val) => val[yKey1])))
  .range([height, 0]);
  svg2
  .append("g")
  .call(d3.axisLeft(y1))
  .call((g) =>
  g
  .append("text")
  .attr("x", -margin.left)
  .attr("y", 10)
  .attr("fill", "currentColor")
  .attr("text-anchor", "start")
  .text(yKey1)
);

// Add dots
var myCircle2 = svg2
.append("g")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("id", (d) => d.id)
.attr("cx", function (d) {
  return x1(d[xKey1]);
})
.attr("cy", function (d) {
  return y1(d[yKey1]);
})
.attr("r", 8)
.style("fill", function (d) {
  return color(d.Species);
})
.style("opacity", 0.5);
//TODO: Define a brush

//TODO: Add brush to the svg
var brush2 = d3.brush()
.extent( [ [0,0], [width,height] ] )
.on("start brush", updateChart2);

svg2.call(brush2)
svg2.on('click', clear());

//clears the brush
function clear() {
  svg2.call(brush2.move, null);
}
//updates svg1 by highlighting circles and svg3 by highlighting bar
function updateChart2(brushEvent) {
  extent = brushEvent.selection;
  var selectedSpecies = new Set();

  //TODO: Check all the circles that are within the brush region in Scatterplot 2
  myCircle2.classed("selected", function(d){
    if (isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) )) {
    selectedSpecies.add(d.Species);}

     return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
  //TODO: Select all the data points in Scatterplot 1 which have the same id as those selected in Scatterplot 2
  svg1.selectAll("circle").classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
  //TODO: Select bars in bar chart based on species selected in Scatterplot 2

  svg3.selectAll("rect").classed("selected", function(d){
    return selectedSpecies.has(d.species)})

}

}});

//TODO: Barchart with counts of different species

d3.csv("data/iris.csv").then ( function(data) {
  var tally = {};


  data.forEach(function (d) {
    tally[d.Species] = (tally[d.Species] || 0) + 1;
  });
  var data = [];
  for (var Species in tally) {
    if (tally.hasOwnProperty(Species)) {
      data.push({
        species: Species,
        frequency: tally[Species]
      })}};

      // Adding the X axis
      const x = d3.scaleBand()
      .range([ 0, width])
      .domain(data.map(d => d.species))
      .padding(0.5);
      svg3.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .call((g) =>
       g
      .append("text")
      .attr("x", width)
      .attr("y", margin.bottom - 4)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text("Iris Species"));



      // Adding the Y axis
      const y = d3.scaleLinear()
      .domain([0, 70])
      .range([ height, 0]);
      svg3.append("g")
      .call(d3.axisLeft(y));

      // Bar Values
      svg3.selectAll("Iris_bar_chart")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.species))
      .attr("y", d => y(d.frequency))
      .attr("width", x.bandwidth())
      .attr("height", d => height  - y(d.frequency))
      .style("fill", function (d) {
        return color(d.species);
      })

      //adding the x label
      svg3.append("text")
    .attr("x", -180)
    .attr("y", 348)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + width/2 + ",80)")
    .text("Iris Species");

      //adding the y label
      svg3.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 10)
      .attr("x", -100)
      .attr("dy", "-2.8em")
      .attr("transform", "rotate(-90)")
      .style("fill", "black")
      .text("Number of Iris Species");

    })
    //Brushing Code---------------------------------------------------------------------------------------------

    //Removes existing brushes from svg
    // function clear() {
    //   svg1.call(brush1.move, null);
    //   svg2.call(brush2.move, null);
    // }

    //Is called when we brush on scatterplot #1
    // function updateChart1(brushEvent) {
    //   //TODO: Check all the circles that are within the brush region in Scatterplot 1
    //   extent = brushEvent.selection;
    //   let brushedIris = [];
    //   svg1.selectAll("circle").attr("class", "unselected")
    //     var brush_coords = d3.brushSelection(this);
    //     svg1.selectAll("circle").filter(function (d) {
    //
    //       var cx = d3.select(this).attr("cx"),
    //       cy = d3.select(this).attr("cy");
    //       if (isBrushed(brush_coords, cx, cy)) {
    //         brushedIris.push(d.id)
    //       }
    //       return isBrushed(brush_coords, cx, cy);
    //
    //     })
    //     .attr("class", "selected");
    //
    //   svg2.selectAll("circle").classed("selected", function(d){return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]))});
    //     if (brushedIris.length > 0) {
    //       svg2.selectAll("circle").filter(function() {
    //         for (let i = 0; i < svg2.selectAll("circle")._groups[0].length; i++) {
    //           for (var j in brushedIris){
    //             console.log("svg2: " + svg2.selectAll("circle")._groups[0].length);
    //             console.log("id from svg1:" + brushedIris[j]);
    //               return svg2.selectAll("circle")._groups[0][i].id == brushedIris[j];
    //           }
    //         }
    //           }
    //         }
    //       }).attr("class", "selected");
    //       //TODO: Select all the data points in Scatterplot 2 which have the same id as those selected in Scatterplot 1
    //     }
    //   }
    //Is called when we brush on scatterplot #2
    // function updateChart2(brushEvent) {
    //   extent = brushEvent.selection;
    //   var selectedSpecies = new Set();
    //
    //   //TODO: Check all the circles that are within the brush region in Scatterplot 2
    //
    //   //TODO: Select all the data points in Scatterplot 1 which have the same id as those selected in Scatterplot 2
    //
    //   //TODO: Select bars in bar chart based on species selected in Scatterplot 2
    //
    // }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;

      var x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
