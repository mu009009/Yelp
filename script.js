
//---------Setting up the canvas --------------//
var canvas0Width = document.getElementById('canvas-1').clientWidth,
    canvas0Height = document.getElementById('canvas-1').clientHeight;

var canvas3Width = document.getElementById('canvas-3').clientWidth,
    canvas3Height = document.getElementById('canvas-3').clientHeight;

var margin = {t: 10, r: 50, b: 15, l: 100};
var plotWidth = canvas0Width - margin.l - margin.r,
    plotHeight = canvas0Height - margin.t - margin.b;

var canvasWidth = canvas3Width - margin.l - margin.r,
    canvasHeight = canvas3Height - margin.t - [margin.b + 70];


var CategoriesDataRecord = [null];
var CategoriesNumberArrary = [null];
var TypeData = null;
var GroupData = null;
var GroupArrary = null;
var KeyWord = null;
var StatesName = null;

KeyWord = "PA";
BussinessDataLoad();

//-------------------------------------  HEAT MAP  ---------------------------------------//
//maybe this is how we select it on canvas 2?
//var heatMap = d3.select("#canvas-2")
//    .append('svg')
//    .attr('class','svg')
//    .attr('id','heatMap');
//
//
////-------------- VARIABLES-----------------//
////var days = d3.max(dataset, function(d) { return d.day; })
////	- d3.min(dataset, function(d) { return d.day; });
////var hours = d3.max(dataset, function(d) { return d.hour; })
////	- d3.min(dataset, function(d) { return d.hour; });
////
//var StarsMin = d3.min(rows, function(d) { return d.Stars; }),
//    StarsMax = d3.max(rows, function(d) { return d.Stars; });
//
//var dotWidth = 1,
//    dotHeight = 3,
//    dotSpacing = 0.5;
//
////var margin = {top: 0, right: 25, bottom: 40, left: 25},
////	width = (dotWidth * 2 + dotSpacing) * days,
////	height = (dotHeight * 2 + dotSpacing) * hours;//200 - margin.top - margin.bottom;
//
//
//var scaleX = d3.time.scale()
//    .domain([new Date(2012, 0, 1), new Date(2012, 11, 31)])
//    .range([0, width]);
//
//var scaleY = d3.scale.ordinal().domain(Name).rangePoints([0, canvasWidth]) //to pull the NAME from the DATA - name of business
//
////Define the color scale
//var colorScale = d3.scale.linear()
//    .domain([StarsMin, StarsMax])
//    .range(["#c41200","#ce882c", "#f5f5f5"]);
//
//// Define X axis
//var xAxis = d3.svg.axis()
//    .scale(scaleX)
//    .orient("bottom")
//    .ticks(d3.time.months)
//    .tickFormat(d3.time.format("%b"));
//
//
//// Define Y axis
//var yAxis = d3.svg.axis()
//    .scale(scaleY)
//    .orient("left")
////.ticks(2);
//
//
////
////// SVG canvas
////var svg = d3.select("#chart")
////	.append("svg")
////	.attr("width", width + margin.left + margin.right)
////	.attr("height", height + margin.top + margin.bottom)
////	.call(zoom)
////	.append("g")
////	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//// Clip path
//svg.append("clipPath")
//    .attr("id", "clip")
//    .append("rect")
//    .attr("width", width)
//    .attr("height", height);
//
//// The Heatmap dots
//svg.append("g")
//    .attr("clip-path", "url(#clip)")
//    .selectAll("ellipse")
//    .data(dataset)
//    .enter()
//    .append("ellipse")
//    .attr("cx", function(d) { return scaleX(d.Name); })
//    .attr("cy", function(d) { return scaleY(d.Month); })
//    .attr("rx", dotWidth)
//    .attr("ry", dotHeight)
//    .attr("fill", function(d) { return colorScale(d.Stars); });
//
////Create X axis
//svg.append("g")
//    .attr("class", "x axis")
//    .attr("transform", "translate(0," + yScale(0) + ")")
//    .call(xAxis)
//
////Create Y axis
//svg.append("g")
//    .attr("class", "y axis")
//    .call(yAxis);
