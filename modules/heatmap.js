


//-------------------------------------  HEAT MAP  ---------------------------------------//
////maybe this is how we select it on canvas 2?
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
//
//
//
//
//
//
//
//
////----------Module---//
//d3.custom.histogram = function(){
//    var margin = {t:25,r:50,b:25,l:50},
//        w = 500,//internal variables, can be modified later
//        h = 300,
//        chartW = w - margin.l - margin.r,
//        chartH = h - margin.t - margin.b,
//        scaleX = d3.scale.linear(),
//        scaleY = d3.scale.linear(),
//        dataRange,
//        layout = d3.layout.histogram();
//
//
//    function exports(_selection){
//        //@param _selection -> d3 selection of <div> elements
//        chartW = w - margin.l - margin.r;
//        chartH = h - margin.t - margin.b;
//        scaleX.range([0,chartW]);
//        scaleY.range([chartH,0]);
//
//        _selection.each(redraw);
//    }
//
//    function redraw(_data){
//        //@param _data -> array of data bound to the selection
//        //"this" -> the selected DOM element
//
//        var histData = layout(_data);
//
//        //scales and axis
//        scaleX.domain(dataRange || d3.extent(_data));
//        scaleY.domain([0,d3.max(histData,function(d){return d.y})]);
//        var axisX = d3.svg.axis()
//            .orient('bottom')
//            .scale(scaleX);
//
//        //Ensure the right DOM structure
//        var svg = d3.select(this).selectAll('svg')
//            .data([_data]);
//
//        //If no <svg> previously appended, append it now
//        //Also append the nested <g> element(s)
//        var svgEnter = svg.enter().append('svg').attr({width:w, height:h});
//        svgEnter
//            .append('g').attr('class','chart histogram')
//            .append('g').attr('class','axis axis-x');
//
//        var chart = svg.select('.chart')
//            .attr('transform','translate('+margin.l+','+margin.t+')');

        //Layers
        //Bars
//        var bars = chart.selectAll('.bin')
//            .data(histData);
//
//        bars.enter()
//            .append('rect')
//            .attr('class','bin')
//            .transition()
//            .call(onTrans);
//
//        bars.exit()
//            .call(onExit);
//
//        bars.transition()
//            .call(onTrans);
//
//        //axis
//        chart.select('.axis-x')
//            .attr('transform','translate(0,'+chartH+')')
//            .transition()
//            .call(axisX);
//
//    }
//    function onEnter(){
//    }
//    function onExit(){
//        this.remove();
//    }
//    function onTrans(){
//        this
//            .attr('x', function(d){return scaleX(d.x)})
//            .attr('width',function(d){return scaleX(d.x+ d.dx) - scaleX(d.x)})
//            .attr('y', function(d){return scaleY(d.y)})
//            .attr('height',function(d){return chartH - scaleY(d.y)});
//    }
//
//    //Getter and setter
//    exports.width = function(_x){
//        if(!arguments.length) return w;
//        w = _x;
//        return this;
//    }
//    exports.height = function(_x){
//        if(!arguments.length) return h;
//        h = _x;
//        return this;
//    }
//    exports.bins = function(_bins){
//        if(!arguments.length) return layout.bins();
//        layout.bins(_bins);
//        return this;
//    }
//    exports.range = function(_range){
//        if(!arguments.length) return layout.range();
//        dataRange = _range;
//        layout.range(_range);
//        return this;
//    }
//
//    return exports;
//}
