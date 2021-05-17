var bar_margin = {top: 30, right: 10, bottom: 30, left: 10},
    bar_width = 460 - bar_margin.left - bar_margin.right,
    bar_height = 320 - bar_margin.top - bar_margin.bottom;

// append the svg object to the body of the page
var bar_svg = d3.select("#barChart")
  .append("svg")
    .attr("width", bar_width + bar_margin.left + bar_margin.right)
    .attr("height", bar_height + bar_margin.top + bar_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + bar_margin.left + "," + bar_margin.top + ")");

// Parse the Data
d3.csv("data/rateByArmed.csv").then(function(raw_data) {
    pop = raw_data.filter(d => d.name === 'Population')
    death = raw_data.filter(d => d.name === 'Death')
    data = ["Black","White","Hispanic"].map(d => {
        return {
            race: d,
            rate: death.map(e => e[d])/pop.map(e => e[d])
        }
    })
    let color = d3.scaleOrdinal()
        .domain(data.map(d => d.race))
        .range([d3.schemeSet2[1],d3.schemeSet2[2],d3.schemeSet2[6],d3.schemeSet2[7]])
    
    // X axis
    var x = d3.scaleBand()
        .range([ 0, bar_width ])
        .domain(data.map(function(d) { return d.race; }))
        .padding(0.2);
    // bar_svg.append("g")
    //     .attr("transform", "translate(0," + bar_height + ")")
    //     .style("font-size","0.8rem")
    //     .call(d3.axisBottom(x))
    //     .call(g => g.select(".domain").remove());

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.rate)])
        .range([ bar_height, 0]);
    // bar_svg.append("g")
    //     .call(d3.axisLeft(y));

    //label
    bar_svg.selectAll(".bartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bartext")
        .style("text-anchor", "middle")
        .attr("x", d => x(d.race)+ x.bandwidth()*0.5)
        .attr("width", x.bandwidth())
        .attr("y", d =>  y(d.rate)- 10)
        .attr("height", function(d) { return bar_height - y(d.rate); })
        .text(d => d.race)
        .style("fill",d =>  myColor(d.race));

    

    // Bars
    bar_svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", d => x(d.race))
            .attr("width", x.bandwidth())
            .attr("fill", d => color(d.race))
            // no bar at the beginning thus:
            .attr("height", function(d) { return bar_height - y(0); }) // always equal to 0
            .attr("y", function(d) { return y(0); });

    // Animation
    bar_svg.selectAll("rect")
        .transition()
        .duration(3000)
        .attr("y", function(d) { return y(d.rate); })
        .attr("height", function(d) { return bar_height - y(d.rate); })
        .delay(function(d,i){console.log(i) ; return(i*100)})

    bar_svg.selectAll(".barrate")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "barrate")
    .style("text-anchor", "middle")
    .attr("x", d => x(d.race)+ x.bandwidth()*0.5)
    .attr("width", x.bandwidth())
    .attr("y", d =>  y(d.rate) + 20)
    .attr("height", function(d) { return bar_height - y(d.rate); })
    .style("fill","black")
    .text(d => d3.format(".1f")(d.rate));
})

