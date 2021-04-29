
const test_rate = [
    {state: 'Average', White: 0.7, Black: 2.7, Hispanic: 1.1, year: 2008},
    {state: 'Average', White: 0.4, Black: 2.7, Hispanic: 1.1, year: 2009},
    {state: 'Average', White: 1.1, Black: 3.0, Hispanic: 1.4, year: 2010},
    {state: 'Average', White: 0.4, Black: 2.7, Hispanic: 1.1, year: 2011},
    {state: 'Average', White: 0.5, Black: 3.3, Hispanic: 1.0, year: 2012},
    {state: 'Average', White: 0.6, Black: 3.3, Hispanic: 1.1, year: 2013},
    {state: 'Average', White: 0.5, Black: 3.3, Hispanic: 1.0, year: 2014},
    {state: 'Average', White: 0.4, Black: 2.7, Hispanic: 1.5, year: 2015},
    {state: 'Average', White: 0.5, Black: 3.9, Hispanic: 0.9, year: 2016},
    {state: 'Average', White: 0.3, Black: 3.7, Hispanic: 0.8, year: 2017},
    {state: 'Average', White: 0.2, Black: 2.7, Hispanic: 0.9, year: 2018},
    {state: 'Average', White: 0.6, Black: 3.1, Hispanic: 1.4, year: 2019},

    {state: 'CA', White: 0.4, Black: 1.7, Hispanic: 1.0, year: 2008},
    {state: 'CA', White: 0.5, Black: 1.9, Hispanic: 1.3, year: 2009},
    {state: 'CA', White: 0.6, Black: 2.0, Hispanic: 1.4, year: 2010},
    {state: 'CA', White: 0.4, Black: 1.7, Hispanic: 1.1, year: 2011},
    {state: 'CA', White: 0.5, Black: 2.3, Hispanic: 1.0, year: 2012},
    {state: 'CA', White: 0.6, Black: 2.3, Hispanic: 1.1, year: 2013},
    {state: 'CA', White: 0.4, Black: 2.5, Hispanic: 1.3, year: 2014},
    {state: 'CA', White: 0.4, Black: 2.7, Hispanic: 1.5, year: 2015},
    {state: 'CA', White: 0.5, Black: 1.9, Hispanic: 0.9, year: 2016},
    {state: 'CA', White: 0.7, Black: 1.7, Hispanic: 0.7, year: 2017},
    {state: 'CA', White: 0.2, Black: 2.7, Hispanic: 0.9, year: 2018},
    {state: 'CA', White: 0.3, Black: 3.7, Hispanic: 0.8, year: 2019},

    {state: 'AZ', White: 0.4, Black: 1.7, Hispanic: 1.0, year: 2008},
    {state: 'AZ', White: 0.5, Black: 1.9, Hispanic: 1.3, year: 2009},
    {state: 'AZ', White: 0.6, Black: 2.0, Hispanic: 1.4, year: 2010},
    {state: 'AZ', White: 0.4, Black: 1.7, Hispanic: 1.1, year: 2011},
    {state: 'AZ', White: 0.5, Black: 1.3, Hispanic: 1.0, year: 2012},
    {state: 'AZ', White: 0.6, Black: 2.3, Hispanic: 1.1, year: 2013},
    {state: 'AZ', White: 0.4, Black: 2.5, Hispanic: 1.3, year: 2014},
    {state: 'AZ', White: 0.4, Black: 2.7, Hispanic: 1.5, year: 2015},
    {state: 'AZ', White: 0.1, Black: 2.9, Hispanic: 1.9, year: 2016},
    {state: 'AZ', White: 0.7, Black: 1.7, Hispanic: 0.7, year: 2017},
    {state: 'AZ', White: 0.2, Black: 2.7, Hispanic: 0.9, year: 2018},
    {state: 'AZ', White: 0.3, Black: 3.7, Hispanic: 0.8, year: 2019},
];

/* checkbox eventlistner */
document.getElementById("checkBlack").addEventListener("input", e=>{ update_line();});
document.getElementById("checkWhite").addEventListener("input", e=>{ update_line();});
document.getElementById("checkHispanic").addEventListener("input", e=>{ update_line();});
document.getElementById("checkAverage").addEventListener("input", e=>{update_line();});

/* Line chart */
var fullHeight = 350;
var fullWidth = 750;
var margin_line = {top: 20, right: 150, bottom: 20, left: 30};
var height_line = fullHeight - margin_line.top - margin_line.bottom;
var width_line = fullWidth - margin_line.right - margin_line.left;
var myColor = d3.scaleOrdinal()
    .domain(test_rate)
    .range(d3.schemeSet2);
var linechart = d3.select("#lineChart")
    .data(test_rate)
    .append("svg")
        .attr("width",fullWidth)
        .attr("height",fullHeight)
    .append("g")
        .attr("transform","translate(" + margin_line.left + "," + margin_line.top + ")");

function update_line(){
    var allRace = [];
    let checkBlack = document.getElementById("checkBlack").checked;
    let checkWhite = document.getElementById("checkWhite").checked;
    let checkHispanic = document.getElementById("checkHispanic").checked;
    if (checkBlack) allRace.push("Black");
    if (checkWhite) allRace.push("White");
    if (checkHispanic) allRace.push("Hispanic");

    // Arrange data
    var allState = [];
    if (mapState) allState.push(mapState);
    console.log(allState);
    let checkAverage = document.getElementById("checkAverage").checked;
    if (checkAverage) allState.push("Average");
           
    function raceByState (i) {
        return allRace.map( function(raceName) {
            return {
                name: raceName,
                values: test_rate.filter(data => data.state === i).map(d => {
                    return {state: d.state, year: d.year, value: +d[raceName]};
                })
            };
        });
    }
    var dataReady = [];
    for (var i=0; i< allState.length; i++){
        dataReady = dataReady.concat(raceByState(allState[i]));
    };

    console.log(dataReady);

    //remove
    linechart.selectAll(".myLines").remove();
    linechart.selectAll("g").remove();

    // Add X axis   
    var x = d3.scaleLinear()
        .domain([2008, 2019])
        .range([ 0, width_line ]);
    linechart.append("g")
        .attr("transform", "translate(0," + height_line + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0,d3.max(dataReady, d => d3.max(d.values,e => e.value))]) ///max y value
        .range([ height_line, 0 ]);
    linechart.append("g")
        .call(d3.axisLeft(y));

    // each line
    var line = d3.line()
        .x(d => x(+d.year))
        .y(d => y(+d.value))

    linechart.selectAll(".myLines")
    .data(dataReady)
    .enter()
    .append("path")
        .attr("d", d => line(d.values))
        .attr("stroke", d =>  myColor(d.name))//d.values[0].state === "Average" ? "var(--grey2)" :
        .style("stroke-width", 2)
        .style("fill", "none")
        .attr("class", "myLines")
        .style("opacity", d => d.values[0].state === "Average" ? 0.4 : 1);

    // category label of each line
    linechart.selectAll(".myLabels")
        .data(dataReady)
        .enter()
            .append('g')
            .append("text")
            .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
            .attr("transform", d => "translate(" + x(d.value.year) + "," + y(d.value.value) + ")") // Put the text at the position of the last point
            .attr("x", 12) // shift the text a bit more right
            .text(d => d.value.state + " " + d.name)
            .style("fill", d => myColor(d.name))
            .style("font-size", 15)
            .attr("class", "myLabels")
            .style("opacity", d => d.value.state === "Average" ? 0.4 : 1);
    /* 
        mouse over effects: vertical line, circle and text
    */
        var mouseG = linechart.append("g")
        .attr("class", "mouse-over-effects");
    // vertical line
    mouseG.append("path") 
        .attr("class", "mouse-line")
        .style("stroke", "var(--grey2)")
        .style("stroke-width", "1px")
        .style("stroke-dasharray", ("6, 3"))
        .style("opacity", "0");
    var lines = document.getElementsByClassName('myLines');
    var mousePerLine = mouseG.selectAll('.mouse-per-line')
        .data(dataReady)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line");
    // circle
    mousePerLine.append('circle')
        .style("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", "3px")
        .style("fill", "var(--darkblue")
        .attr('r', 5)
        .style("opacity", 0);
    // text
    mousePerLine.append('text')
        .style("opacity", 0)
        .attr("text-anchor", "left")
        .style("fill","var(--grey1)")
        .attr("alignment-baseline", "middle");
    // place those effects
    mouseG.append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width_line)
        .attr('height', height_line)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);
    
    function mouseover() {
        d3.select(".mouse-line")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "1");
    }
    function mousemove() {
        var mouse = d3.mouse(this);
        d3.selectAll(".mouse-per-line") // vertical line, circle and text
            .attr("transform", function(d, i) {
                var xDate = x.invert(mouse[0]) ,
                    bisect = d3.bisector(function(d) { return d.year; }).left;
                    idx = bisect(d.values, xDate);

                d3.select(".mouse-line")
                    .attr("d", function () {
                    var data = "M" + x(d.values[idx].year) + "," + (height_line);
                    data += " " + x(d.values[idx].year) + "," + 0;
                    return data;
                    });

                d3.select(this).select('text')
                    .attr("x", d.values[idx].year === 2019 ? -35 : 15)
                    .text(d.values[idx].value);

                return "translate(" + x(d.values[idx].year) + "," + y(d.values[idx].value) + ")";                       
            });
    }

    function mouseout() {
        d3.select(".mouse-line")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "0");
    }
}
update_line();