
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
 var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  const squareSize = 9; 
  const strokeWidth = 1.3;
  const numPerRow = 30;
  const numPerCol = 34;
  const w = (squareSize + (strokeWidth * 2)) * numPerRow; // width of chart
  const h = (squareSize + (strokeWidth * 2)) * numPerCol; // height of chart
  const margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
  }
  // color 
  var myColor = d3.scaleSequential()  
        .interpolator(d3.interpolateReds) // color
        .domain([-20,150]);

  var Ordinalcolor = d3.scaleOrdinal(d3.schemeTableau10)
                      .domain(d3.range(0,10)) ;

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];


  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
    selection.each(function (rawData) {
      // create svg and give it a width and height
      svg = d3.select(this).append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .attr('id', 'scrollsvg');

      svg.append('g');
      g = svg.select('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

      // // perform some preprocessing on raw data
      // var gunData = getGun(rawData);
      // var ageData = getAge(rawData);
      // var flightData = getFlight(rawData);
      

      //setupVis(gunData, ageData, flightData);

      setupSections();
    });
  };

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   */
  var setupVis = function (gunData, ageData, flightData) {
    //gunchart
    var gunchart = g.selectAll('rect')
              .data(gunData, function (d) { return d.name; });

    gunchart.enter().append('rect')
      .attr('x', (d, i) => {
          const n = i % numPerRow;
          return scale(n);
      })
      .attr('y', (d, i) => {
          const n = Math.floor(i / numPerRow);
          return scale(n);
      })
      .attr('fill', d => d.armed == 'gun' ? Ordinalcolor(2) : 'var(--grey1)')
      .attr('ry', 10)
      .attr('rx', 10)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr("class", 'gun');
      
    g.selectAll('.gun')
      .attr('opacity', 0);

    //agechart
    var agechart = g.selectAll('rect')
      .data(ageData, function (d) { return d.id; });

    agechart.enter().append('rect')
      .attr('x', (d, i) => {
          const n = i % numPerRow;
          return scale(n);
      })
      .attr('y', (d, i) => {
          const n = Math.floor(i / numPerRow);
          return scale(n);
      })
      .attr('fill', function (d) {
          if (d.age == 'Unknown') {return Ordinalcolor(9); }
          else if  (d.age > 40) {return Ordinalcolor(1);}
          else if (d.age >20)  {return  Ordinalcolor(0);}
          else {return Ordinalcolor(2);}   
      })
      .attr('ry', 10)
      .attr('rx', 10)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr("class", 'age');
  
      
    g.selectAll('.age')
      .attr('opacity', 0);
    
    //flightchart
    var flightchart = g.selectAll('rect')
      .data(flightData, function (d) { return d.name; });

    flightchart.enter().append('rect')
     .attr('x', (d, i) => {
          const n = i % numPerRow;
          return scale(n);
      })
      .attr('y', (d, i) => {
          const n = Math.floor(i / numPerRow);
          return scale(n);
      })
      .attr('fill',function (d) { 
          if (d.flee == 'Unknown') {return Ordinalcolor(9); }
          else if  (d.flee == 'Foot') {return Ordinalcolor(1);}
          else if (d.flee == 'Car')  {return  Ordinalcolor(0);}
          else {return Ordinalcolor(2);}    
      } )
      .attr('ry', 10)
      .attr('rx', 10)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr("class", 'flee');
  
    g.selectAll('.flee')
      .attr('opacity', 0);  
  };    


  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showInitial;
    activateFunctions[1] = showGun;
    activateFunctions[2] = showAge;
    activateFunctions[3] = showFlight;
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  function showInitial(gunData) {
    

    // g.selectAll('.gun')
    //   .transition()
    //   .duration(600)
    //   // .delay(function (d) {
    //   //   return 5 * d.row;
    //   // })
    //   .attr('opacity', 1.0)

    // g.selectAll('.age')
    //   .transition()
    //   .duration(0)
    //   .attr('opacity', 0);

    // g.selectAll('.flight')
    //   .transition()
    //   .duration(0)
    //   .attr('opacity', 0);  
    g.selectAll('rect').remove();
    var gunchart = g.selectAll('rect')
              .data(gunData, function (d) { return d.name; });

    gunchart.enter().append('rect')
      .attr('x', (d, i) => {
          const n = i % numPerRow;
          return scale(n);
      })
      .attr('y', (d, i) => {
          const n = Math.floor(i / numPerRow);
          return scale(n);
      })
      .attr('fill', 'var(--grey1)')
      .attr('ry', 10)
      .attr('rx', 10)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr("class", 'gun')
      .transition()
      .duration(600);
  }
 

  function showGun(gunData) {
    

    // g.selectAll('.gun')
    //   .transition()
    //   .duration(600)
    //   // .delay(function (d) {
    //   //   return 5 * d.row;
    //   // })
    //   .attr('opacity', 1.0)

    // g.selectAll('.age')
    //   .transition()
    //   .duration(0)
    //   .attr('opacity', 0);

    // g.selectAll('.flight')
    //   .transition()
    //   .duration(0)
    //   .attr('opacity', 0);  
    g.selectAll('rect').remove();
    var gunchart = g.selectAll('rect')
              .data(gunData, function (d) { return d.name; });

    gunchart.enter().append('rect')
      .attr('x', (d, i) => {
          const n = i % numPerRow;
          return scale(n);
      })
      .attr('y', (d, i) => {
          const n = Math.floor(i / numPerRow);
          return scale(n);
      })
      .attr('fill', d => d.armed == 'gun' ? Ordinalcolor(2): 'var(--grey1)')
      .attr('ry', 10)
      .attr('rx', 10)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr("class", 'gun')
      .transition()
      .duration(600);
  }


  function showAge(ageData) {
    

    // g.selectAll('.gun')
    //   .transition()
    //   .duration(0)
    //   // .delay(function (d) {
    //   //   return 5 * d.row;
    //   // })
    //   .attr('opacity', 0)

    // g.selectAll('.age')
    //   .transition()
    //   .duration(600)
    //   .attr('opacity', 1.0);

    // g.selectAll('.flight')
    //   .transition()
    //   .duration(0)
    //   .attr('opacity', 0);  
    g.selectAll('rect').remove();
    var agechart = g.selectAll('rect')
      .data(ageData, function (d) { return d.id; });

    agechart.enter().append('rect')
      .attr('x', (d, i) => {
          const n = i % numPerRow;
          return scale(n);
      })
      .attr('y', (d, i) => {
          const n = Math.floor(i / numPerRow);
          return scale(n);
      })
      .attr('fill', function (d) {
          if (d.age == 'Unknown') {return Ordinalcolor(9); }
          else if  (d.age > 40) {return Ordinalcolor(1);}
          else if (d.age >20)  {return  Ordinalcolor(0);}
          else {return Ordinalcolor(2);}   
      })
      .attr('ry', 10)
      .attr('rx', 10)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr("class", 'age')
      .transition()
      .duration(600);
  }

  function showFlight(flightData) {
    

    // g.selectAll('.gun')
    //   .transition()
    //   .duration(0)
    //   // .delay(function (d) {
    //   //   return 5 * d.row;
    //   // })
    //   .attr('opacity', 0)

    // g.selectAll('.age')
    //   .transition()
    //   .duration(0)
    //   .attr('opacity', 0);

    // g.selectAll('.flight')
    //   .transition()
    //   .duration(6000)
    //   .attr('opacity', 1.0);  
    g.selectAll('rect').remove();
    var flightchart = g.selectAll('rect')
      .data(flightData, function (d) { return d.name; });

    flightchart.enter().append('rect')
     .attr('x', (d, i) => {
          const n = i % numPerRow;
          return scale(n);
      })
      .attr('y', (d, i) => {
          const n = Math.floor(i / numPerRow);
          return scale(n);
      })
      .attr('fill',function (d) { 
          if (d.flee == 'Unknown') {return Ordinalcolor(9); }
          else if  (d.flee == 'Foot') {return Ordinalcolor(1);}
          else if (d.flee == 'Car')  {return  Ordinalcolor(0);}
          else {return Ordinalcolor(2);}    
         })
      .attr('ry', 10)
      .attr('rx', 10)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr("class", 'flee')
      .transition()
      .duration(600);

  }


  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index, gunData,  ageData,flightData,) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      if (i == 1) {activateFunctions[i](gunData);}
      else if (i == 2){activateFunctions[i](ageData);}
      else if (i == 3){activateFunctions[i](flightData);}
      else if (i == 0){activateFunctions[i](gunData);}
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  // return chart function
  return chart;
};




//legend
 var scrollVisLegend = function () {
  // constants to define the size
  // and margins of the vis area.
  const squareSize = 9; 
  const strokeWidth = 1.3;
  const numPerRow = 30;
  const numPerCol = 34;
  const w = (squareSize + (strokeWidth * 2)) * numPerRow; // width of chart
  const h = (squareSize + (strokeWidth * 2)) * numPerCol; // height of chart
  const margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
  }
  // color 

  var Ordinalcolor = d3.scaleOrdinal(d3.schemeTableau10)
                      .domain(d3.range(0,10)) ;

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];


  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
    selection.each(function (rawData) {
      // create svg and give it a width and height
      svg = d3.select(this).append('svg')
            .attr('width', 400)
            .attr('height',50)
            .attr('id','legendsvg');

      // // perform some preprocessing on raw data
      // var gunData = getGun(rawData);
      // var ageData = getAge(rawData);
      // var flightData = getFlight(rawData);
      

      //setupVis(gunData, ageData, flightData);

      setupSections();
    });
  };

  


  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showInitial;
    activateFunctions[1] = showGun;
    activateFunctions[2] = showAge;
    activateFunctions[3] = showFlight;
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  
  function showInitial() {

    svg.selectAll("circle").remove();
    svg.selectAll("text").remove();  

  }
  function showGun() {
    
    var glkeys = ["Gun Involved","Gun Not Involved"];

    svg.selectAll("circle").remove();
    svg.selectAll("mydots")
    .data(glkeys)
    .enter()
    .append("circle")
    .attr("cx", function(d,i){ return 30 + i*150})
    .attr("cy", 25) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 5)
    .style("fill", function(d){ return d === 'Gun Involved' ? Ordinalcolor(2) : 'var(--grey1)';});

    svg.selectAll("text").remove();  
    svg.selectAll("mylabels")
      .data(glkeys)
      .enter()
      .append("text")
        .attr("x", function(d,i){ return 50 + i*150})
        .attr("y", 25)
        .style("fill", function(d){ return d === 'Gun Involved' ? Ordinalcolor(2): 'var(--grey1)';})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
      .transition()
      .duration(600);
  }


  function showAge() {
    var alkeys = ['<20',"20-40",">40","Unknown"];

    svg.selectAll("circle").remove();
    svg.selectAll("mydots")
      .data(alkeys)
      .enter()
      .append("circle")
      .attr("cx", function(d,i){ return 10 + i*100})
      .attr("cy", 25) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 5)
      .style("fill", function (d) {
          if (d == 'Unknown') {return Ordinalcolor(9); }
          else if  (d == '>40') {return Ordinalcolor(1);}
          else if (d == '20-40')  {return  Ordinalcolor(0);}
          else {return Ordinalcolor(2);}    
  });

    svg.selectAll("text").remove();  
    svg.selectAll("mylabels")
        .data(alkeys)
        .enter()
        .append("text")
          .attr("x", function(d,i){ return 20 + i*100})
          .attr("y", 25)
          .style("fill", function (d) {
            if (d == 'Unknown') {return Ordinalcolor(9); }
            else if  (d == '>40') {return Ordinalcolor(1);}
            else if (d == '20-40')  {return  Ordinalcolor(0);}
            else {return Ordinalcolor(2);}    
              })  
          .text(function(d){ return d})
          .attr("text-anchor", "left")
          .style("alignment-baseline", "middle")
      .transition()
      .duration(600);
  }

  function showFlight(flightData) {
    

    var flkeys = d3.set(flightData.map(function(d) { return d.flee; })).values();

    svg.selectAll("circle").remove();
    svg.selectAll("mydots")
        .data(flkeys)
        .enter()
        .append("circle")
        .attr("cx", function(d,i){ return 10 + i*100})
        .attr("cy", 25) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 5)
        .style("fill", function (d) {
          if (d == 'Unknown') {return Ordinalcolor(9); }
          else if  (d == 'Foot') {return Ordinalcolor(1);}
          else if (d == 'Car')  {return  Ordinalcolor(0);}
          else {return Ordinalcolor(2);}  
        }   
    );

    svg.selectAll("text").remove();  
    svg.selectAll("mylabels")
          .data(flkeys)
          .enter()
          .append("text")
            .attr("x", function(d,i){ return 20 + i*100})
            .attr("y", 25)
            .style("fill", function (d) {          
              if (d == 'Unknown') {return Ordinalcolor(9); }
              else if  (d == 'Foot') {return Ordinalcolor(1);}
              else if (d == 'Car')  {return  Ordinalcolor(0);}
              else {return Ordinalcolor(2);}  })  
            .text(function(d){ 
                if (d == 'Not fleeing') {return "Not fleeing"; }
                else if  (d == 'Unknown') {return "Unknown";}
                else if (d == 'Car') {return "By car"}
                else {return "By foot";}})
            .style("font-size", "12px")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

  }


  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index, gunData,  ageData,flightData,) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      if (i == 1) {activateFunctions[i]();}
      else if (i == 2){activateFunctions[i]();}
      else if (i == 3){activateFunctions[i](flightData);}
      else if (i == 0){activateFunctions[i]();}
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  // return chart function
  return chart;
};



/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(data) {
  //create data 
  var year = document.getElementById("year-filter").value;
  var counts = d3.count(data.filter(d=>d.date.substring(0,4) == year), d=>d.id);
  document.getElementById("S_Number").innerHTML = counts;
  
  // console.log(year);
  var gunData = getGun(data);
  var ageData = getAge(data);
  var flightData = getFlight(data);
  
  // create a new plot and
  // display it
  d3.select('#scrollsvg').remove();
  d3.select('#legendsvg').remove();
  var plot = scrollVis();

  d3.select('#vis')
    .datum(data)
    .call(plot);
  var plotlegend = scrollVisLegend();
  d3.select('#vislegend')
    .datum(data)
    .call(plotlegend);



  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index,gunData,ageData,flightData);
    plotlegend.activate(index,gunData,ageData,flightData);
  });
  // do nothing when it is within one step
  scroll.on('progress', function (index, progress) {
  });


  // get data for GunChart
  function getGun(raw_data) {
  let gunData = raw_data.filter(d=>d.date.substring(0,4) == year);
  gunData.map(d => d.armed === '' ? d.armed = 'Unknown': d.armed);
  gunData.map(d => d.armed === 'gun' ? d.armed : d.armed = 'Notgun');

  return gunData.sort((a, b) => d3.descending(a.armed, b.armed));
  }
  // get data for AgeChart
  function getAge(raw_data) {
    let ageData = raw_data.filter(d => d.date.substring(0,4) == year);
    ageData.map(d => d.age === '' ? d.age ='Unknown': d.age);
    ageData.map(d => +d.age < 10 ? d.age ='06': d.age);
    return ageData.sort((a, b) => d3.ascending(a.age, b.age)); 
  }
  // get data for FleeChart
  function getFlight(raw_data) {
    let flightData = raw_data.filter(d => d.date.substring(0,4) == year );
    flightData.map(d => d.flee === "Other" ? d.flee ='Unknown': d.flee);
    flightData.map(d => d.flee === "" ? d.flee ='Unknown': d.flee);
    let countByflee = d3.rollup(flightData, v => v.length, d => d.flee); //count of each state
    return flightData.sort((a, b) => d3.descending(countByflee.get(a.flee), countByflee.get(b.flee))); 
  }
}

// d3.csv('data/death-by-police.csv', display);
// load data and display
// d3.csv('data/death-by-police.csv').then(function (data){
//   display(data);
// });
