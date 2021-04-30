const usmap = [[0, 0, ""], [1, 0, ""], [2, 0, ""], [3, 0, ""], [4, 0, ""], [5, 0, ""], 
                [6, 0, ""], [7, 0, ""], [8, 0, ""], [9, 0, ""], [10, 0, ""], [11, 0, "ME"], 
                [0, 1, "AK"], [1, 1, ""], [2, 1, ""], [3, 1, ""], [4, 1, ""], [5, 1, ""], 
                [6, 1, "WI"], [7, 1, ""], [8, 1, ""], [9, 1, ""], [10, 1, "VT"], [11, 1, "NH"], 
                [0, 2, ""], [1, 2, "WA"], [2, 2, "ID"], [3, 2, "MT"], [4, 2, "ND"], [5, 2, "MN"], 
                [6, 2, "IL"], [7, 2, "MI"], [8, 2, ""], [9, 2, "NY"], [10, 2, "MA"], [11, 2, ""], 
                [0, 3, ""], [1, 3, "OR"], [2, 3, "NV"], [3, 3, "WY"], [4, 3, "SD"], [5, 3, "IA"], 
                [6, 3, "IN"], [7, 3, "OH"], [8, 3, "PA"], [9, 3, "NJ"], [10, 3, "CT"], [11, 3, "RI"], 
                [0, 4, ""], [1, 4, "CA"], [2, 4, "UT"], [3, 4, "CO"], [4, 4, "NE"], [5, 4, "MO"], 
                [6, 4, "KY"], [7, 4, "WV"], [8, 4, "VA"], [9, 4, "MD"], [10, 4, "DE"], [11, 4, ""], 
                [0, 5, ""], [1, 5, ""], [2, 5, "AZ"], [3, 5, "NM"], [4, 5, "KS"], [5, 5, "AR"], 
                [6, 5, "TN"], [7, 5, "NC"], [8, 5, "SC"], [9, 5, "DC"], [10, 5, ""], [11, 5, ""], 
                [0, 6, "HI"], [1, 6, ""], [2, 6, ""], [3, 6, ""], [4, 6, "OK"], [5, 6, "LA"], 
                [6, 6, "MS"], [7, 6, "AL"], [8, 6, "GA"], [9, 6, ""], [10, 6, ""], [11, 6, ""], 
                [0, 7, ""], [1, 7, ""], [2, 7, ""], [3, 7, ""], [4, 7, "TX"], [5, 7, ""], 
                [6, 7, ""], [7, 7, ""], [8, 7, ""], [9, 7, "FL"], [10, 7, ""], [11, 7, ""]]
                .map(d => ({ col: d[0], row: d[1], code: d[2] }));

const wmap = 550; 
const hmap = 400; 

const grid_svg = d3.select("#gridmap").append("svg")
    .attr("font-size", "10pt")
    .attr("width", wmap)
    .attr("height", hmap);    

const grid_g = grid_svg.append("g").attr("transform", "translate(10,20)");  

// Make the slider
var dataTime = d3.range(0, 12).map(function(d) {
    return 2008 + d;
    });
    
var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1)
    .width(wmap-50)
    .tickValues(dataTime)
    .tickFormat(d3.format("d"))
    .default(2008)
var gTime = d3
    .select('div#slider')
    .append("center")
    .append('svg')
    .attr('width', wmap)
    .attr('height', 50)
    .append('g')
    .attr('transform', 'translate(15,10)')

gTime.call(sliderTime); 

// draw
d3.csv("data/raceRate.csv").then(function (raw_data) {
    function dataByYear (year){
        return outputData = raw_data.map(d=>{
            let white = "White"+year;
            let black = "Black"+year;
            let hispanic = "Hispanic"+year;
            let total = "Total"+year;
            return {
                code: d.state,
                name: d.location,
                year: year,
                White: +[d[white]],
                Black: +[d[black]],
                Hispanic: +[d[hispanic]],
                Total: +[d[total]],
            }
        })
    };

    let yearArray = Array.from({length: 12}, (v, i) => i+2008);
    let dataReady = [];
    for (var i=0; i< yearArray.length; i++){
        let year = yearArray[i];
        dataReady = dataReady.concat(dataByYear(year));
    };

    let data = dataReady.filter(d => d.code !== 'Average' && d.year === 2008);

    function render (data){
        grid_g.selectAll('g').remove();
        const gmap = new GridMap(grid_g)
            .size([wmap-50, hmap])      
            .style({sizeByValue: false, showMapLegend: false, shape: "square"})      
            .field({ code: "code", name: "", total: ["Total"]})
            .cellPalette(d3.interpolateOrRd)
            .mapGrid(usmap)    
            .data(data)
            .render();
    }
    render(data);
    sliderTime.on("onchange", val => {
        let myYear = val
        data = dataReady
            .filter(d => d.code !== 'Average' && d.year === myYear);
        render(data);
    })
});


