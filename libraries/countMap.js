
function scroll_display(){
    d3.csv('data/death-by-police.csv').then(function (data){
         display(data);
     });
}

document.getElementById("year-filter").addEventListener("input", e=>{
    let year = e.target.value;
    document.getElementById("year-selected").innerHTML = year;
    document.getElementById("S_Year").innerHTML = year;
    console.log(e.target.value);
    render();
    scroll_display();
});

const stateCodeToFips =
            {"AK": "02", "AL": "01", "AR": "05", "AS": "60", "AZ": "04", "CA": "06", "CO": "08", "CT": "09", "DC": "11",
                "DE": "10", "FL": "12", "GA": "13", "GU": "66", "HI": "15", "IA": "19", "ID": "16", "IL": "17",
                "IN": "18", "KS": "20", "KY": "21", "LA": "22", "MA": "25", "MD": "24", "ME": "23", "MI": "26",
                "MN": "27", "MO": "29", "MS": "28", "MT": "30", "NC": "37", "ND": "38", "NE": "31", "NH": "33",
                "NJ": "34", "NM": "35", "NV": "32", "NY": "36", "OH": "39", "OK": "40", "OR": "41", "PA": "42",
                "PR": "72", "RI": "44", "SC": "45", "SD": "46", "TN": "47", "TX": "48", "UT": "49", "VA": "51",
                "VI": "78", "VT": "50", "WA": "53", "WI": "55", "WV": "54", "WY": "56"};

        const fipsToStateCode = Object.entries(stateCodeToFips).reduce((ret, entry) => {
            const [ key, value ] = entry;
            ret[ value ] = key;
            return ret;
        }, {});

        const squareSize = 9; // length of a side of a square
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
        // choose of color
        var myColor = d3.scaleSequential()
            .interpolator(d3.interpolateReds)
            .domain([0, 200]);

        var myColorGrey = d3.scaleSequential()
            .interpolator(d3.interpolateGreys)
            .domain([0, 100]);
        let countTop = 5;

        var myColorMain = d3.scaleOrdinal()
            .range(['#cb181d','#fb6a4a','#fc9272','#fcbba1','#fee0d2'])
            .domain(Array.from(Array(countTop).keys()));

        legend({color: myColor, width: 330, svgIn: d3.select('#legendddd')});// title: "Number of Killed Citizens",

        var Ordinalcolor = d3.scaleOrdinal(d3.schemeCategory10);

        var Fourcolor = d3.scaleOrdinal(d3.schemeCategory10)
                           .domain(["unknown", "40","20","0"]) ;

        // Create scale
        const scale = d3.scaleLinear()
        .domain([0, numPerRow])
        .range([0, w]);

        // Create the svg
        var svg = d3.select("#grids").append('svg')
        .attr('class', 'chart')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        var chart = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // create div for tooltip
        var tooltip = d3.select(".tooltippp")
        .style("opacity", 0);

        var tooltipState = d3.select(".tooltipState")
        .style("opacity", 0);

        // create map
        var map = d3.choropleth()
        .geofile('https://cdn.jsdelivr.net/npm/d3-geomap@3.3.0/dist/topojson/countries/USA.json')
        .projection(d3.geoAlbersUsa)
        .height(h + margin.top + margin.bottom)
        .column('count')
        .unitId('fips')
        .scale(800)
        .legend(false);



function renderCalendar(year, data) {
    d3.select("#calendar").selectAll("*").remove();

    const weeksInMonth = function(month) {
        var m = d3.timeMonth.floor(month)
        return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m,1)).length;
    };


    const countByDate = d3.rollup(data, v => v.length, d => new Date(d.date));
    console.log(countByDate);


  const cellMargin = 2,
      cellSize = 13;


  const day = d3.timeFormat("%w"),
      week = d3.timeFormat("%U"),
      titleFormat = d3.timeFormat("%Y-%m-%d"),
      monthName = d3.timeFormat("%B"),
      months= d3.timeMonth.range(new Date(year, 0), new Date(year, 11, 32));


  const svg = d3.select("#calendar").selectAll("svg")
    .data(months)
    .enter().append("svg")
    .attr("class", "month")
    .attr("height", ((cellSize * 7) + (cellMargin * 8) + 20) ) // the 20 is for the month labels
    .attr("width", function(d) {
      var columns = weeksInMonth(d);
      return ((cellSize * columns) + (cellMargin * (columns + 1)));
    })
    .append("g");


  svg.append("text")
    .attr("class", "month-name")
    .attr("y", (cellSize * 7) + (cellMargin * 8) + 15 )
    .attr("x", function(d) {
      var columns = weeksInMonth(d);
      return (((cellSize * columns) + (cellMargin * (columns + 1))) / 2);
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return monthName(d); });


  var rect = svg.selectAll("rect.day")
    .data(function(d, i) { return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1)); })
    .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("rx", 3).attr("ry", 3) // rounded corners
    .attr("fill", '#eaeaea') // default light grey fill
    .attr("y", function(d) { return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin; })
    .attr("x", function(d) { return ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize) + ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellMargin) + cellMargin ; })
    .on("mouseover", function(d) {
      d3.select(this).classed('hover', true);
    })
    .on("mouseout", function(d) {
      d3.select(this).classed('hover', false);
    });

    rect.append("title").text(d => titleFormat(d) + " - " + (countByDate.get(d) || 0) + ' kills');

    var scale = d3.scaleLinear()
    .domain(d3.extent(countByDate.values()))
    .range([0.4,1]);

  rect.filter(d => countByDate.has(d))
    .style("fill", d => d3.interpolatePuBu(scale(countByDate.get(d))));
}


        /**
         * Render the data into the visualization layout.
         */
         function render() {
            d3.csv("data/death-by-police.csv").then(function (raw_data) {
                // get variable year from html                
                let year = document.getElementById("year-filter").value;
                let data = raw_data.filter(d=>d.date.substring(0,4)==year);

                renderCalendar(year, data);

                // sort data by count of death in each state    
                let countByState = d3.rollup(data, v => v.length, d => d.state); //count of each state
                data.sort((a, b) => d3.descending(countByState.get(a.state), countByState.get(b.state)) == 0
                ? d3.descending(a.state,b.state):d3.descending(countByState.get(a.state), countByState.get(b.state))); // sort by count
                
                // topstate and bottomstate: color split
                let sortState = d3.nest()
                    .key(d => d.state)
                    .rollup(a => a.length)
                    .entries(data)
                    .sort((a, b) => d3.ascending(a.values, b.values));

                let topStates = sortState.slice(0,countTop).map(d => d.key);
                let bottomStates = sortState.slice(0,-1).map(d => d.key);
                let colorChoose = d => topStates.includes(d) ? myColorMain(topStates.indexOf(d)) : myColorGrey(countByState.get(d) || 0); //d: state name
                let colorChoose2 = d => myColorMain(bottomStates.indexOf(d)%countTop);

                // clean data
                data.map(d => d.age === '' ? d.age ='Unknown': d.age);
                data.map(d => d.gender === 'F' ? d.gender ='Female': d.gender ='Male');
                data.map(d => {
                    if (d.race === 'B'){return d.race = 'Black'}
                    else if (d.race === 'H'){return d.race = 'Hispanic'}
                    else if (d.race === 'W'){return d.race = 'White'}
                    else {return d.race = 'Other'}
                });
                
                chart.selectAll('rect').remove();

                // Append new squares
                const squares = chart.selectAll('rect')
                .data(data, function (d) { return d.name; })

                squares.enter().append('rect')
                .attr('x', (d, i) => {
                    const n = i % numPerRow;
                    return scale(n);
                })
                .attr('y', (d, i) => {
                    const n = Math.floor(i / numPerRow);
                    return scale(n);
                })
                .attr('fill', d => colorChoose(d.state))//d => myColor(countByState.get(d.state))
                .attr('ry', 10)
                .attr('rx', 10)
                .attr('width', squareSize)
                .attr('height', squareSize)
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .transition().delay(function (d, i) { return .9 * i; })
                .attr("class", (d) => { return d.state; });

                function handleMouseOver(d) {
                    // highlight rect 
                    d3.select(this).attr('opacity', '40%');
                    const colorIcon = (e) => {
                        if (e === 'White'){ return '#FBE5CB'}
                        else if (e === 'Hispanic'){return '#C89877'}
                        else if (e === 'Black'){return '#996144'}
                        else {return '#BDBDBD'}
                    };
                    
                    tooltip.transition()
                    .duration(30)
                    .style("opacity", 1)
                    tooltip.html('<div style="margin-top: 0.2rem; display:flex; justify-content:flex-start; align-items:center;"><i class="fa fa-user fa-5x" aria-hidden="true "></i><div style="margin-left:30px">Age:'
                         + d.age + "<br>Race: " + d.race + "<br>Location: " + d.city + ", "+ d.state + "<br>Flee: " + d.flee + "</div>" +'</div>')
                    // .style("color", colorChoose(d.state));
                    .style("color", colorIcon(d.race));

                    d3.select('.unit-US' + stateCodeToFips[d.state]).classed("map-state-highlighted", true);
                }

                function handleMouseOut(d) {
                    // unhighlight color
                    d3.select(this).attr('opacity', '100%');
                    tooltip.transition()
                    .duration(30)
                    .style("opacity", 0);

                    d3.select('.unit-US' + stateCodeToFips[d.state]).classed("map-state-highlighted", false);
                }

                // Map to Grid
                const mapData = d3.rollups(data, v => v.length, d => d.state).map(([k, v]) => {return {fips: "US"+stateCodeToFips[k], count: v}}); // return {fip, count}
                
                d3.selectAll('.unit').remove(); // remove
                d3.select('#mappppp>svg').remove();

                let stateSelected = false;
                let arrayOfSelected = []; // an array containing all selected states

                function selectState(d) {
                    stateSelected = true;
                    const stateName = fipsToStateCode[d.properties.fips.slice(2)];
                    const rank = sortState.map(d => d.key).indexOf(stateName) + 1;

                    svg.selectAll("rect")
                        .filter(d => d.state !== stateName)
                        .attr('opacity', '30%');
                    d3.selectAll('.unit').filter(d2 => d !== d2).attr('opacity', '50%');
                    tooltipState.transition()
                        .duration(30)
                        .style("opacity", 1)
                    tooltipState.html("<br>State: " + stateName + "<br>Deaths: " + (countByState.get(stateName) || '0') + "<br>Death Rank: " + rank)
                                .style("color", colorChoose(stateName));
                }

                function unselectState(d) {
                    stateSelected = false;

                    const stateName = fipsToStateCode[d.properties.fips.slice(2)];

                    svg.selectAll("rect")
                        .filter(d => d.state !== stateName)
                        .attr('opacity', '100%');
                    d3.selectAll('.unit').filter((d2) => d !== d2).attr('opacity', '100%');
                    tooltipState.transition()
                        .duration(30)
                        .style("opacity", 0);
                }

                map.postUpdate(() => {
                    d3.selectAll('.unit')
                        .style('fill', d => colorChoose(fipsToStateCode[d.properties.fips.slice(2)]))
                        .on("click", (d) => {
                            if (stateSelected) {
                                unselectState(d);
                            } else {
                                selectState(d);
                            }
                        })
                        .on("mouseout", unselectState);
                    })
                    .draw(d3.select('#mappppp').datum(mapData)); 
                });
        }

        render();

scroll_display();