

// set the dimensions and margins of the graph
var bpmargin = {top: 10, right: 30, bottom: 50, left: 90},
    width = 1000 - bpmargin.left - bpmargin.right,
    height = 600 - bpmargin.top - bpmargin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#horizontal_boxplot")
  .append("svg")
    .attr("width", width + bpmargin.left + bpmargin.right)
    .attr("height", height + bpmargin.top + bpmargin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + bpmargin.left + "," + bpmargin.top + ")");

// Read the data and compute summary statistics for each specie
d3.csv("data/Race_Pop.csv").then(function(data) {

  function dataByYear (year){
    return outputData = data.map(d=>{
      let whiteP = "White"+year;
      let blackP = "Black"+year;
      let hispanicP = "Hispanic"+year;
      let whiteR = "rate_White"+year;
      let blackR = "rate_Black"+year;
      let hispanicR = "rate_Hispanic"+year;
      return {
          state: d.state,
          year: year,
          WhiteP: +[d[whiteP]],
          BlackP: +[d[blackP]],
          HispanicP: +[d[hispanicP]],
          WhiteR: +[d[whiteR]],
          BlackR: +[d[blackR]],
          HispanicR: +[d[hispanicR]],
      }
    })
  };

  let yearArray = Array.from({length: 12}, (v, i) => i+2008);
  let test_rate = [];
  for (var i=0; i< yearArray.length; i++){
    let year = yearArray[i];
    test_rate = test_rate.concat(dataByYear(year));
  };

  var allRace = ["Black", "White", "Hispanic"];
  var bpdata =[]
  for (var i=0; i< allRace.length; i++){
    let raceName = allRace[i];
    var a = test_rate.map(d => {
              let raceP = raceName+"P";
              let raceR = raceName+"R";
              return {state: d.state, year: d.year, race : raceName, P: +d[raceP], R: +d[raceR]};
              });
    bpdata = bpdata.concat(a);
  };
  

  // year = 2019
  bpdata = bpdata.filter(function(d) { return d.year == 2019})

  // console.log(bpdata);

  // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.race;})
    .rollup(function(d) {
      q1 = d3.quantile(d.map(function(g) { return g.R;}).sort(d3.ascending),.25)
      median = d3.quantile(d.map(function(g) { return g.R;}).sort(d3.ascending),.5)
      q3 = d3.quantile(d.map(function(g) { return g.R;}).sort(d3.ascending),.75)
      interQuantileRange = q3 - q1
      // min = q1 - 1.5 * interQuantileRange
      min = d3.min(d, function (g) { return +g.R; });
      max = d3.max(d, function (g) { return +g.R; });
      // max = q3 + 1.5 * interQuantileRange
      return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    })
    .entries(bpdata)

  // console.log(sumstat);

  // Show the Y scale
  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(["Black", "White", "Hispanic"])
    .padding(.4);
  svg.append("g")
    .attr("transform", "translate(-20, 0)")
    .style("font-size", "16px")
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Show the X scale
  var min = d3.min(bpdata, function (d) { return +d.R; });
  var max = d3.max(bpdata, function (d) { return +d.R; });
  var x = d3.scaleSqrt()
    .domain([min,max])
    .range([0, width])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5))
    .select(".domain").remove()
  // console.log(min);  
  // console.log(max);  
  
  // Color scale
  var myColor = d3.scaleSequentialSqrt()
    .interpolator(d3.interpolateYlOrRd)
    .domain([min,max])

  // Size scale
  var s = d3.scaleLinear()
  .range([3, 10])
  .domain([d3.min(bpdata, function (d) { return +d.P; }),d3.max(bpdata, function (d) { return +d.P; })])  

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + bpmargin.top + 30)
      // .text("Death Rate")
      .style('fill', 'var(--grey2)');

  // Show the main horizontal line
  svg
    .selectAll("horizLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.value.min))})
      .attr("x2", function(d){return(x(d.value.max))})
      .attr("y1", function(d){return(y(d.key) + y.bandwidth()/2)})
      .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
      .attr("stroke", "var(--grey2)")
      .attr("stroke-width", 2)
      .style("width", 40)

  // rectangle for the main box
  svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.value.q1))}) // console.log(x(d.value.q1)) ;
        .attr("width", function(d){ ; return(x(d.value.q3)-x(d.value.q1))}) //console.log(x(d.value.q3)-x(d.value.q1))
        .attr("y", function(d) { return y(d.key); })
        .attr("height", y.bandwidth() )
        .style("fill", "#fc8d62")
        .style("opacity", 0.4)


  // Show the median
  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("y1", function(d){return(y(d.key))})
      .attr("y2", function(d){return(y(d.key) + y.bandwidth())})
      .attr("x1", function(d){return(x(d.value.median))})
      .attr("x2", function(d){return(x(d.value.median))})
      .attr("stroke", "var(--red3)")
      .style("width", 80)

  // create a tooltip
  var bp_tooltip = d3.select("#horizontal_boxplot")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("font-size", "14px");
  // Three function that change the tooltip when user hover / move / leave a cell
  function mouseover (d) {
    bp_tooltip
      .transition()
      .duration(200)
      .style("opacity", 1);
    bp_tooltip
        .html("<span style='color:grey'> State: </span>" + d.state + "<span style='color:grey'> Death Rate: </span>" + d3.format("(.1f")(d.R)) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
        .style("left", (d3.event.pageX+30)  + "px")
        .style("top", (d3.event.pageY+30)  + "px");
  }
  function mousemove (d) {
    bp_tooltip
      .style("left", (d3.event.pageX+30) + "px")
      .style("top", (d3.event.pageY+30) + "px")
  }
  function mouseleave (d) {
    bp_tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  // Add individual points with jitter
  var jitterWidth = 50;
  svg
    .selectAll("indPoints")
    .data(bpdata)
    .enter()
    .append("circle")
      .attr("cx", function(d){ return(x(d.R))})
      .attr("cy", function(d){ return( y(d.race) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth )})
      .attr("r", function(d){ return s(d.P*1.5 )})
      .style("fill", function(d){ return(myColor(+d.R)) })
      .attr("stroke", "var(--grey3)")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseleave)


})
