var armed_margin = {top: 10, right: 30, bottom: 10, left: 40},
    awidth = 460,
    aheight = 300;

const armed_svg = d3.select("#armedChart").append("svg")
    .attr("width", awidth + armed_margin.left + armed_margin.right)
    .attr("height", aheight + armed_margin.top + armed_margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + armed_margin.left + "," + armed_margin.top + ")");

d3.csv("data/rateByArmed.csv").then(function (data) {
    const formatPercent = d3.format(".0%")
    const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

    series = d3.stack()
        .keys(data.columns.slice(1))
        .offset(d3.stackOffsetExpand)
        (data)
        .map(d => (d.forEach(v => v.key = d.key), d))

    let x = d3.scaleLinear()
        .range([armed_margin.left, awidth - armed_margin.right])
    let y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([armed_margin.top, aheight - armed_margin.bottom])
        .padding(0.1)
    let color = d3.scaleOrdinal()
        .domain(series.map(d => d.key))
        .range([d3.schemeSet2[1],d3.schemeSet2[2],d3.schemeSet2[6],d3.schemeSet2[7]])
        .unknown("#ccc")
    let xAxis = g => g
        .attr("transform", `translate(0,${aheight - armed_margin.bottom})`)
        // .call(d3.axisBottom(x).ticks(awidth / 100, "%"))
        .call(g => g.selectAll(".domain").remove())

    let yAxis = g => g
    .attr("transform", `translate(${armed_margin.left},0)`)
    .style("font-size", 12)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())

    armed_svg.append("g")
    .selectAll("g")
    .data(series)
    .enter().append("g")
        .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
        .attr("x", d => x(d[0]))
        .attr("y", (d, i) => y(d.data.name))
        .attr("width", d => x(d[1]) - x(d[0]))
        .attr("height", y.bandwidth())
    .append("title")
        .text(d => `${d.key} ${formatPercent(d[1] - d[0])}`);
    // label of percentage
    armed_svg.append("g")
    .selectAll("g")
    .data(series)
    .enter().append("g")
    .selectAll("text")
        .data(d => d)
    .join("text")
        .attr("transform", d => "translate(" + x(d[0]) + "," + y(d.data.name) + ")") 
        .attr("x", d => (x(d[1]) - x(d[0]))/2)
        .attr("y", y.bandwidth()/2)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .text(d => `${formatPercent(d[1] - d[0])}`)
        .style("font-size", 12);

    armed_svg.append("g")
        .call(xAxis);

    armed_svg.append("g")
        .call(yAxis);


})