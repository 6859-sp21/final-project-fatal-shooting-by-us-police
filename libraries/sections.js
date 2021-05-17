
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
 
  /*
  Same config as countMap.js line 32-43
  */
  // var squareSize = 9; 
  // var strokeWidth = 1.3;
  // var numPerRow = 30;
  // var numPerCol = 34;
  // var w = (squareSize + (strokeWidth * 2)) * numPerRow; // width of chart
  // var h = (squareSize + (strokeWidth * 2)) * numPerCol; // height of chart
  // var margin = {
  //       top: 5,
  //       right: 5,
  //       bottom: 5,
  //       left: 5,
  // }
 var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
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
  // var setupVis = function (gunData, ageData, flightData) {
  //   //gunchart
  //   var gunchart = g.selectAll('rect')
  //             .data(gunData, function (d) { return d.name; });

  //   gunchart.enter().append('rect')
  //     .attr('x', (d, i) => {
  //         const n = i % numPerRow;
  //         return scale(n);
  //     })
  //     .attr('y', (d, i) => {
  //         const n = Math.floor(i / numPerRow);
  //         return scale(n);
  //     })
  //     .attr('fill', d => d.armed == 'gun' ? Ordinalcolor(2) : 'var(--grey1)')
  //     .attr('ry', 10)
  //     .attr('rx', 10)
  //     .attr('width', squareSize)
  //     .attr('height', squareSize)
  //     .attr("class", 'gun');
      
  //   g.selectAll('.gun')
  //     .attr('opacity', 0);

  //   //agechart
  //   var agechart = g.selectAll('rect')
  //     .data(ageData, function (d) { return d.id; });

  //   agechart.enter().append('rect')
  //     .attr('x', (d, i) => {
  //         const n = i % numPerRow;
  //         return scale(n);
  //     })
  //     .attr('y', (d, i) => {
  //         const n = Math.floor(i / numPerRow);
  //         return scale(n);
  //     })
  //     .attr('fill', function (d) {
  //         if (d.age == 'Unknown') {return Ordinalcolor(9); }
  //         else if  (d.age > 40) {return Ordinalcolor(1);}
  //         else if (d.age >20)  {return  Ordinalcolor(0);}
  //         else {return Ordinalcolor(2);}   
  //     })
  //     .attr('ry', 10)
  //     .attr('rx', 10)
  //     .attr('width', squareSize)
  //     .attr('height', squareSize)
  //     .attr("class", 'age');
  
      
  //   g.selectAll('.age')
  //     .attr('opacity', 0);
    
  //   //flightchart
  //   var flightchart = g.selectAll('rect')
  //     .data(flightData, function (d) { return d.name; });

  //   flightchart.enter().append('rect')
  //    .attr('x', (d, i) => {
  //         const n = i % numPerRow;
  //         return scale(n);
  //     })
  //     .attr('y', (d, i) => {
  //         const n = Math.floor(i / numPerRow);
  //         return scale(n);
  //     })
  //     .attr('fill',function (d) { 
  //         if (d.flee == 'Unknown') {return Ordinalcolor(9); }
  //         else if  (d.flee == 'Foot') {return Ordinalcolor(1);}
  //         else if (d.flee == 'Car')  {return  Ordinalcolor(0);}
  //         else {return Ordinalcolor(2);}    
  //     } )
  //     .attr('ry', 10)
  //     .attr('rx', 10)
  //     .attr('width', squareSize)
  //     .attr('height', squareSize)
  //     .attr("class", 'flee');
  
  //   g.selectAll('.flee')
  //     .attr('opacity', 0);  
  // };    


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
    // activateFunctions[1] = showGun;
    activateFunctions[1] = showAge;
    activateFunctions[2] = showFlight;
    activateFunctions[3] = showRace;

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
  var scale = d3.scaleLinear()
        .domain([0, numPerRow])
        .range([0, w]);

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
    svg.selectAll('.raceGroup').remove();
    svg.selectAll('.raceNumber').remove();
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
    svg.selectAll('.raceGroup').remove();
    svg.selectAll('.raceNumber').remove();
    gunData.sort((a, b) => d3.ascending(a.arm, b.arm)); 
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
      .attr('fill', d => d.arm === 'Armed' ? Ordinalcolor(2): 'var(--grey1)')
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
    svg.selectAll('.raceGroup').remove();
    svg.selectAll('.raceNumber').remove();
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
    svg.selectAll('.raceGroup').remove();
    svg.selectAll('.raceNumber').remove();
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

   function showRace(my_data){
        g.selectAll('rect').remove();
        var numpr = 8;	
        var x0_scale = d3.scaleBand().padding(0.1).range([0, w]);
        var x1_scale = d3.scaleLinear();
  		var y_scale = d3.scaleLinear().range([h - 30,0]);
  		var format = d3.format(".0%");

        x0_scale.domain(["White","Black","Hispanic","Others"]);
        x1_scale.domain([0,numpr]).range([0, x0_scale.bandwidth()]);

        y_scale.domain([0,Math.floor(d3.max(my_data,function(d){return d.group_id})/numpr)+3]);

 
		var mygroup = svg.selectAll('.raceGroup')
              		.data(x0_scale.domain(),function(d){return d});
    	mygroup.exit().remove();
   		var enter = mygroup.enter()
                        .append("g")
                        .attr("class","raceGroup")

    	//append rectangles to new group
    	enter.append("text").attr("class","bar_text")
    	//merge and remove
    	mygroup = mygroup.merge(enter);

    	  //set for bar text attributes
    	mygroup.select(".bar_text")
            .attr("x",function(d){ return x0_scale(d) + (x0_scale.bandwidth()*0.15)})
            .attr("y",function(d){return 395})
            // .attr("fill",function(d){ //fill dependent on whether survival is being shown.
            //   if(fill_type == "both"){
            //     return all_colours[d]
            //   } else {
            //     return survival_colours[1] //if survival, show 'Survived' colour as text = survived %
            // }})
            .attr("fill",'var(--grey1)')
            .text(function(d){ return d;
              })
            .attr("transform","translate(" + 1 + "," + 1+ ")")


            
              //repeat data,exit,enter and merge for dots
        var my_group = g.selectAll("rect")
                      .data(my_data, function (d) { return d.group_id; });

	    my_group.enter()
	    		.append('rect')	
	            .attr("x", d => {
          		 n = d.group_id % numpr;
         		 return  (x0_scale(d.race)) + x1_scale(n);
      			})
	            .attr("y", d => {
          		n = Math.floor(d.group_id / numpr);
          		return y_scale(n);
      			})
	       		.attr('fill',function (d) { 
         		if (d.arm == 'Armed') {return Ordinalcolor(2);}
         		else {return 'var(--grey1)' }
        		// else {return 'var(--grey1)'}    
       			  })
	            .attr('ry', 5)
      			.attr('rx', 5)
      			.attr('width', squareSize/1.5)
      			.attr('height', squareSize/1.5)
	            .attr("transform","translate(" + 1+ "," + 1+ ")");

	    // Number        
	 	var mygroup = svg.selectAll('.raceNumber')
              		.data(x0_scale.domain(),function(d){return d});
    	mygroup.exit().remove();
   		var enter = mygroup.enter()
                        .append("g")
                        .attr("class","raceNumber")

    	//append rectangles to new group
    	enter.append("text").attr("class","bar_number")
    	//merge and remove
    	mygroup = mygroup.merge(enter);

    	  //set for bar text attributes
    	mygroup.select(".bar_number")
            .attr("x",function(d){ return x0_scale(d) + (x0_scale.bandwidth()*0.45)})
            .attr("y",function(d){return y_scale(Math.floor(d3.max(my_data,function(m){if(m.race==d){return m.group_id}})/numpr)+1)})
            .attr("fill",'var(--grey1)')
            .text(function(d){ 
            	var group_count = my_data.filter(function(m){if(m.race==d){return m}}).length;
                var armed_count =  my_data.filter(function(m){if(m.race==d && m.arm == "Armed"){return m}}).length;
                return format(armed_count/group_count)
              })
            .style("font-size", "14px");


	  };

 

  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index, gunData,  ageData,flightData,RaceData) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      if (i == 1){activateFunctions[i](ageData);}
      else if (i == 2){activateFunctions[i](flightData);}
      else if (i == 0){activateFunctions[i](gunData);}
      else if (i == 3){activateFunctions[i](RaceData);}
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
            .attr('width', w + margin.left)
            .attr('height',50)
            .attr('id','legendsvg');

      // // perform some preprocessing on raw data
      // var gunData = getGun(rawData);
      // var ageData = getAge(rawData);
      // var flightData = getFlight(rawData);
      

      //setupVis(gunData, ageData, flightData);

      setupSectionsL();
    });
  };

  


  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  var setupSectionsL = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showInitialL;
    // activateFunctions[1] = showGunL;
    activateFunctions[1] = showAgeL;
    activateFunctions[2] = showFlightL;
    activateFunctions[3] = showRaceL;
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

  
  function showInitialL() {

    svg.selectAll("circle").remove();
    svg.selectAll("text").remove();  

  }
  function showGunL() {
    
    var glkeys = ["Armed","Unarmed"];

    svg.selectAll("circle").remove();
    svg.selectAll("mydots")
    .data(glkeys)
    .enter()
    .append("circle")
    .attr("cx", function(d,i){ return 70 + i*150})
    .attr("cy", 25) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 5)
    .style("fill", function(d){ return d === 'Armed' ? Ordinalcolor(2) : 'var(--grey1)';});

    svg.selectAll("text").remove();  
    svg.selectAll("mylabels")
      .data(glkeys)
      .enter()
      .append("text")
        .attr("x", function(d,i){ return 90 + i*150})
        .attr("y", 25)
        .style("fill", function(d){ return d === 'Armed' ? Ordinalcolor(2): 'var(--grey1)';})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
      .transition()
      .duration(600);
  }


  function showAgeL() {
    var alkeys = ['<20',"20-40",">40","Unknown"];

    svg.selectAll("circle").remove();
    svg.selectAll("mydots")
      .data(alkeys)
      .enter()
      .append("circle")
      .attr("cx", function(d,i){ return 10 + i*90})
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
          .attr("x", function(d,i){ return 20 + i*90})
          .attr("y", 25)
          .style("fill", function (d) {
            if (d == 'Unknown') {return Ordinalcolor(9); }
            else if  (d == '>40') {return Ordinalcolor(1);}
            else if (d == '20-40')  {return  Ordinalcolor(0);}
            else {return Ordinalcolor(2);}    
              })  
          .text(function(d){ return d})
          .attr("text-anchor", "left")
          .style("font-size", "14px")
          .style("alignment-baseline", "middle")
      .transition()
      .duration(600);
  }

  function showFlightL(flightData) {
    

    var flkeys = d3.set(flightData.map(function(d) { return d.flee; })).values();

    svg.selectAll("circle").remove();
    svg.selectAll("mydots")
        .data(flkeys)
        .enter()
        .append("circle")
        .attr("cx", function(d,i){ if (i == 0){return 10;} else if(i == 1) {return 120} 
        	else if (i ==2){return 200}
        	else{return 285}  
        })
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
            .attr("x", function(d,i){ 
            	if (i == 0){return 20;} else if(i == 1) {return 130} 
        	else if (i ==2){return 210}
        	else{return 295}  
            })
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
            .style("font-size", "14px")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

  }
    function showRaceL() {
    


    svg.selectAll("circle").remove();

    svg.selectAll("text").remove();  


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
      if (i == 1){activateFunctions[i]();}
      else if (i == 2){activateFunctions[i](flightData);}
      else if (i == 0){activateFunctions[i]();}
      else if (i == 3){activateFunctions[i]();}
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
  var RaceData = getRace(data);
  var gunData = RaceData;
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
    plot.activate(index,gunData,ageData,flightData,RaceData);
    plotlegend.activate(index,gunData,ageData,flightData);
  });
  // do nothing when it is within one step
  scroll.on('progress', function (index, progress) {
  });


  // get data for GunChart
  // function getGun(raw_data) {
	 //  let gunData = raw_data.filter(d=>d.date.substring(0,4) == year);
	 //  gunData.map(d => d.armed === '' ? d.armed = 'Unknown': d.armed);
	 //  gunData.map(d => d.armed === 'gun' ? d.armed : d.armed = 'Notgun');
	 //  return gunData.sort((a, b) => d3.descending(a.armed, b.armed));
  // }
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

  function getRace(raw_data){
  	var my_data = raw_data.filter(d=>d.date.substring(0,4) == year);
  	my_data.map(d => d.armed === "" ? d.armed='Unknown': d.armed);
    my_data.map(d => d.armed === "unarmed" ? d.armed ='Unarmed': d.armed);
    my_data.map(d => d.armed === "Unarmed" || d.armed === "Unknown" ? d.armed: d.armed = "Armed");
  	my_data.sort((a, b) => d3.descending(a.armed, b.armed)); 
  	
    var current_positions = [];
    var group_id = [-1,-1,-1,-1];
    for(d in my_data){
    	// var group_count = my_data.filter(function(m){if(m.race==my_data[d].race){return m}}).length;
        // var arms;
        // if (my_data[d].armed == ""){
        // 	arms = 'Unknown';
        // }
        // else if(my_data[d].armed =="unarmed"){
        // 	arms = 'Unarmed';
        // } else{
        // 	arms = 'Armed';
        // }
        var races;
        var gid;
        if (my_data[d].race == 'W'){
        	races = 'White';
        	gid = group_id[0]+1
        	group_id[0] = group_id[0] +1 
        }else if(my_data[d].race ==='B'){
        	races = 'Black';
        	gid = group_id[1]+1
        	group_id[1] = group_id[1] +1 
        } else if (my_data[d].race === 'H'){
        	races = 'Hispanic';
        	gid = group_id[2]+1
        	group_id[2] = group_id[2] +1 
        }else {
        	races = 'Others';
        	gid = group_id[3]+1
        	group_id[3] = group_id[3] +1 
        }

        current_positions.push ({
          id: my_data[d].id,
          group_id: gid,
          arm: my_data[d].armed,
          name: my_data[d].name,
          race: races,
     	 })
    }
    return current_positions;
  }
}

// d3.csv('data/death-by-police.csv', display);
// load data and display
// d3.csv('data/death-by-police.csv').then(function (data){
//   display(data);
// });
