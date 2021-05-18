
// set the dimensions and margins of the graph
var bpmargin = {top: 10, right: 30, bottom: 50, left: 90},
    bpw = 1000, bph = 450,
    width = bpw - bpmargin.left - bpmargin.right,
    height = bph - bpmargin.top - bpmargin.bottom;

// Make the slider
var dataTime2 = d3.range(0, 12).map(function(d) {
  return 2008 + d;
  });
  
var sliderTime2 = d3
  .sliderBottom()
  .min(d3.min(dataTime2))
  .max(d3.max(dataTime2))
  .step(1)
  .width(bpw- bpmargin.right)
  .tickValues(dataTime2)
  .tickFormat(d3.format("d"))
  .default(2008)

var gTime2 = d3
  .select('div#slider2')
  // .append("center")
  .append('svg')
  .attr('width', bpw)
  .attr('height', 50)
  .call(responsivefy)
  .append('g')
  .attr('transform', 'translate(15,10)')
  

gTime2.call(sliderTime2); 

// append the svg object to the body of the page
var box_svg = d3.select("#horizontal_boxplot")
  .append("svg")
    .attr("width", width + bpmargin.left + bpmargin.right)
    .attr("height", height + bpmargin.top + bpmargin.bottom)
    // .attr("transform",
    //       "translate(" + bpmargin.left + "," + bpmargin.top + ")")
    .call(responsivefy);

var box_g = box_svg.append("g")
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
  var bpdata_raw =[]
  for (var i=0; i< allRace.length; i++){
    let raceName = allRace[i];
    var a = test_rate.map(d => {
              let raceP = raceName+"P";
              let raceR = raceName+"R";
              return {state: d.state, year: d.year, race : raceName, P: +d[raceP], R: +d[raceR]};
              });
    bpdata_raw = bpdata_raw.concat(a);
  };

  // year = 2008
  bpdata = bpdata_raw.filter(function(d) { return d.year == 2008})
  render(bpdata);
  // time slider
  sliderTime2.on("onchange", val => {
    let myYear = val
    bpdata = bpdata_raw.filter(d => d.year == myYear)
    render(bpdata);
  })

  function render (bpdata){
    // box_svg.selectAll("g").remove();
    // box_svg.selectAll("circle").remove();
    box_svg.selectAll(".xscale").remove()
    box_svg.selectAll(".yscale").remove()
    // box_svg.selectAll("line").remove()
    // box_svg.selectAll("rect").remove()
    box_svg.selectAll("text").remove();

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
  box_g.append("g")
   .attr("class","yscale")
    .attr("transform", "translate(-20, 0)")
    .style("font-size", "1rem")
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove();

  // Show the X scale
  var min = d3.min(bpdata, function (d) { return +d.R; });
  var max = d3.max(bpdata, function (d) { return +d.R; });
  var x = d3.scaleSqrt()
    .domain([min,max])
    .range([0, width])
  box_g.append("g")
    .attr("class","xscale")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5))
    .select(".domain").remove();
  
  // Color scale
  var myColorW = d3.scaleSequentialSqrt()
    .interpolator(d3.interpolateBlues)
    .domain([min,max])

  var myColorH = d3.scaleSequentialSqrt()
    .interpolator(d3.interpolateYlOrBr)
    .domain([min,max])

  var myColorB = d3.scaleSequentialSqrt()
    .interpolator(d3.interpolateOrRd)
    .domain([min,max])

  // Size scale
  var s = d3.scaleLinear()
  .range([4, 15])
  .domain([d3.min(bpdata, function (d) { return +d.P; }),d3.max(bpdata, function (d) { return +d.P; })])  
  // Size Legend
  var minP = d3.min(bpdata, function (d) { return +d.P; })
  var maxP = d3.max(bpdata, function (d) { return +d.P; })
  var meanP1 = (maxP - minP)/3
  var meanP2 = (maxP - minP)/3*2
  var formatSuffix = d3.format(".1s");
  box_svg.append("text").attr("x", 100).attr("y", 20).text("Population").style("font-size", "15px").attr("alignment-baseline","middle").style("fill",'var(--grey2)');
  box_svg.append("circle").attr("cx",250).attr("cy",20).attr("r", function(){ return s(minP)}) .style("stroke", "gray").style("stroke-width", 1).style("fill", "none");
  box_svg.append("circle").attr("cx",400).attr("cy",20).attr("r", s(meanP1)) .style("stroke", "gray").style("stroke-width",1)  .style("fill", "none");
  box_svg.append("circle").attr("cx",550).attr("cy",20).attr("r", s(meanP2)) .style("stroke", "gray").style("stroke-width",1)  .style("fill", "none");
  box_svg.append("circle").attr("cx",700).attr("cy",20).attr("r", s(maxP)) .style("stroke", "gray") .style("stroke-width", 1) .style("fill", "none");
  box_svg.append("text").attr("x", 270).attr("y", 20).text(function(){ return formatSuffix(minP)}).style("font-size", "15px").attr("alignment-baseline","middle").style("fill",'var(--grey2)');
  box_svg.append("text").attr("x", 420).attr("y", 20).text(function(){ return formatSuffix(meanP1)}).style("font-size", "15px").attr("alignment-baseline","middle").style("fill",'var(--grey2)');
  box_svg.append("text").attr("x", 570).attr("y", 20).text(function(){ return formatSuffix(meanP2)}).style("font-size", "15px").attr("alignment-baseline","middle").style("fill",'var(--grey2)');
  box_svg.append("text").attr("x", 720).attr("y", 20).text(function(){ return formatSuffix(maxP)}).style("font-size", "15px").attr("alignment-baseline","middle").style("fill",'var(--grey2)');


  // Add X axis label:
  box_g.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + bpmargin.top + 30)
      .text("Death per 1 million by race")
      .style("font-size","0.8rem")
      .style('fill', 'var(--grey2)');

  // Show the main horizontal line
  var my_hor = box_g.selectAll(".horizLines")
                      .data(sumstat);
  my_hor.exit().remove();
  var enter = my_hor.enter()
                     .append("g")
                     .attr("class","horizLines")
  enter.append("line").attr("class","horline")   
  my_hor = my_hor.merge(enter)
 
  my_hor.select(".horline")
      .transition()
      .duration(1000)
      .attr("x1", function(d){return(x(d.value.min))})
      .attr("x2", function(d){return(x(d.value.max))})
      .attr("y1", function(d){return(y(d.key) + y.bandwidth()/2)})
      .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
      .attr("stroke", "var(--red3)")
      .attr("stroke-width", 2)
      .style("width", 40)

  // rectangle for the main box
  var my_rects = box_g.selectAll(".boxes")
                      .data(sumstat);
  my_rects.exit().remove();
  var enter = my_rects.enter()
                     .append("g")
                     .attr("class","boxes")
  enter.append("rect").attr("class","boxes_rect")   
  my_rects = my_rects.merge(enter)
 
  my_rects.select(".boxes_rect")
      .transition()
      .duration(1000)
        .attr("x", function(d){return(x(d.value.q1))}) // console.log(x(d.value.q1)) ;
        .attr("width", function(d){ ; return(x(d.value.q3)-x(d.value.q1))}) //console.log(x(d.value.q3)-x(d.value.q1))
        .attr("y", function(d) { return y(d.key); })
        .attr("height", y.bandwidth() )
        .style("fill", "#fc8d62")
        .style("opacity", 0.4)


  // Show the median
  var my_median = box_g.selectAll(".medianLines")
                      .data(sumstat);
  my_median.exit().remove();
  var enter = my_median.enter()
                     .append("g")
                     .attr("class","medianLines")
  enter.append("line").attr("class","medianline")   

  my_median = my_median.merge(enter)
 
  my_median.select(".medianline")
      .transition()
      .duration(1000)
      .attr("y1", function(d){return(y(d.key))})
      .attr("y2", function(d){return(y(d.key) + y.bandwidth())})
      .attr("x1", function(d){return(x(d.value.median))})
      .attr("x2", function(d){return(x(d.value.median))})
      .attr("stroke", "var(--red3)")
      .style("width", 80)



  // draw circles
  var jitterWidth = 50;

  var my_circles = box_g.selectAll(".indPoints")
                      .data(bpdata);

  my_circles.exit().remove();

  // enter new circle
  var enter = my_circles.enter()
                     .append("g")
                     .attr("class","indPoints")

  //append to new group
  enter.append("circle").attr("class","circledot")   

  //merge and remove
  my_circles = my_circles.merge(enter)


 
  my_circles.select(".circledot")
      .transition()
      .duration(1000)
      .attr("cx", function(d){ return(x(d.R))})
      .attr("cy", function(d){ return( y(d.race) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth)})
      .attr("r", function(d){ return s(d.P)})
      .style("fill", function(d){ 
        if (d.race == "Black") return(myColorB(+d.R)) 
        if (d.race == "White") return(myColorW(+d.R)) 
        if (d.race == "Hispanic") return(myColorH(+d.R)) 
      })
      .attr("stroke", "var(--darkblue)")
  
  my_circles.on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseleave)



  // create a tooltip
  var bp_tooltip = d3.select("#horizontal_boxplot")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("font-size", "14px");
  // Three function that change the tooltip when user hover / move / leave a cell
  function mouseover (d) {
    box_g.selectAll("circle")
      .filter(a => a.state === d.state)
      .attr("stroke-width", 2);
    box_g.selectAll("circle")
      .filter(a => a.state !== d.state)
      .style("opacity", 0.15);
    bp_tooltip
      .transition()
      .duration(200)
      .style("opacity", 1);
    bp_tooltip
        .html("<span style='font-size:0.7rem; display: block;color:grey'>"+ d.race + "</span>" + "<span style='color:grey'> State: </span>" + d.state + 
        "<span style='color:grey'> Death Rate: </span>" + d3.format("(.1f")(d.R)) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
        .style("left", (d3.event.pageX+20)  + "px")
        .style("top", (d3.event.pageY+20)  + "px");
  }
  function mousemove (d) {
    bp_tooltip
      .style("left", (d3.event.pageX+30) + "px")
      .style("top", (d3.event.pageY+30) + "px")
  }
  function mouseleave (d) {
    box_g.selectAll("circle")
      .style("opacity", 1)
      .attr("stroke-width", 1);
    bp_tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }
}

})

