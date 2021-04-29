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

const usdeath = [
    { code: "AK", name: "", White: 2.2, Black: 0.3, Hispanic: 0},
    { code: "AL", name: "", White: 6.3, Black: 3.1, Hispanic: 0.1},
    { code: "AR", name: "", White: 4.6, Black: 2.6, Hispanic: 0},
    { code: "AZ", name: "", White: 10.9, Black: 1.7, Hispanic: 8.3},
    { code: "CA", name: "", White: 2.21, Black: 1.22, Hispanic: 3.16},
    { code: "CO", name: "", White: 9.1, Black: 1.8, Hispanic: 4.8},
    { code: "CT", name: "", White: 1.1, Black: 0.3, Hispanic: 0.6},
    { code: "DC", name: "", White: 0.1, Black: 1.2, Hispanic: 0},
    { code: "DE", name: "", White: 0.5, Black: 0.5, Hispanic: 0},
    { code: "FL", name: "", White: 1.59, Black: 1.11, Hispanic: 5.1},
    { code: "GA", name: "", White: 7.7, Black: 7.1, Hispanic: 0.9},
    { code: "HI", name: "", White: 0.3, Black: 0.1, Hispanic: 0.1},
    { code: "IA", name: "", White: 2.4, Black: 0.7, Hispanic: 0},
    { code: "ID", name: "", White: 3.0, Black: .1, Hispanic: .5},
    { code: "IL", name: "", White: 2.8, Black: 5.8, Hispanic: 1.3},
    { code: "IN", name: "", White: 5.7, Black: 3.0, Hispanic: .4},
    { code: "KS", name: "", White: 3.4, Black: .6, Hispanic: .8},
    { code: "KY", name: "", White: 6.7, Black: 1.5, Hispanic: .3},
    { code: "LA", name: "", White: 3.9, Black: 6.0, Hispanic: .1},
    { code: "MA", name: "", White: 1.7, Black: .8, Hispanic: .7},
    { code: "MD", name: "", White: 2.6, Black: 4.7, Hispanic: .3},
    { code: "ME", name: "", White: 1.8, Black: .1, Hispanic: .1},
    { code: "MI", name: "", White: 4.3, Black: 2.4, Hispanic: .2},
    { code: "MN", name: "", White: 3.7, Black: 1.0, Hispanic: .3},
    { code: "MO", name: "", White: 7.2, Black: 4.8, Hispanic: .3},
    { code: "MS", name: "", White: 3.6, Black: 2.3, Hispanic: .1},
    { code: "MT", name: "", White: 2.5, Black: 0, Hispanic: 0},
    { code: "NC", name: "", White: 8.8, Black: 5.1, Hispanic: .8},
    { code: "ND", name: "", White: .6, Black: 0, Hispanic: 0},
    { code: "NE", name: "", White: 1.6, Black: .5, Hispanic: .2},
    { code: "NH", name: "", White: 1.2, Black: 0, Hispanic: 0},
    { code: "NJ", name: "", White: 2.1, Black: 3.0, Hispanic: .8},
    { code: "NM", name: "", White: 2.6, Black: 1, Hispanic: 6.4},
    { code: "NV", name: "", White: 3.9, Black: 1.5, Hispanic: 2.8},
    { code: "NY", name: "", White: 3.5, Black: 4.6, Hispanic: .8},
    { code: "OH", name: "", White: 8.4, Black: 5.6, Hispanic: .1},
    { code: "OK", name: "", White: 10.0, Black: 3.2, Hispanic: .9},
    { code: "OR", name: "", White: 6.3, Black: .7, Hispanic: .6},
    { code: "PA", name: "", White: 4.7, Black: 4.2, Hispanic: .6},
    { code: "RI", name: "", White: 1, Black: .2, Hispanic: .1},
    { code: "SC", name: "", White: 5.0, Black: 2.7, Hispanic: .2},
    { code: "SD", name: "", White: 1.0, Black: 0, Hispanic: 0},
    { code: "TN", name: "", White: .89, Black: .21, Hispanic: .3},
    { code: "TX", name: "", White: 1.75, Black: .99, Hispanic: 1.42},
    { code: "UT", name: "", White: 3.6, Black: .7, Hispanic: 1.2},
    { code: "VA", name: "", White: 4.5, Black: 4.0, Hispanic: 0.4},
    { code: "VT", name: "", White: 0.7, Black: 0, Hispanic: 0},
    { code: "WA", name: "", White: 6.6, Black: 2.1, Hispanic: 2.1},
    { code: "WI", name: "", White: 5.6, Black: 2.0, Hispanic: 0.6},
    { code: "WV", name: "", White: 3.7, Black: 0.8, Hispanic: 0},
    { code: "WY", name: "", White: 0.9, Black: 0, Hispanic: 0.2},
    ]

/* Grid map */
var mapState = null;
const wmap = 550; 
const hmap = 420; 

const grid_svg = d3.select("#gridmap").append("svg")
    .attr("font-size", "10pt")
    .attr("width", wmap)
    .attr("height", hmap);    

const grid_g = grid_svg.append("g").attr("transform", "translate(25,0)");  
const gmap = new GridMap(grid_g)
    .size([wmap, hmap])      
    .style({sizeByValue: true, legendTitle: "Death Rate", shape: "square"})      
    .field({ code: "code", name: "", total: ["White"]})
    .cellPalette(d3.interpolateOrRd)
    .mapGrid(usmap)    
    .data(usdeath)
    .render();