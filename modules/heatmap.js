//
//
//function DrawHeatMap(rows, busiName) {
//
//
//    //todo:-----------STEP UP-----------//
//    //setting up the min and max for the color scale // that will relate to the STARS connected reviews
//    var starsMin = d3.min(rows, function (d) {
//            return d.Stars; }),
//        starsMax = d3.max(rows, function (d) {
//            return d.Stars; });
//
//
//    //features for the dots
//    var dotWidth = 2,
//        dotHeight = 2,
//        dotSpacing = 0.5;
//
//
//    console.log("rows", rows);
//    //to generate 10 businesses from the category
//    dataHolder = [];    //introducing it
//
//    var countSel = 100;
//
//    for (var i = 0; i < countSel; i++) {
//        random_busi = Math.floor(Math.random() * rows.length)
//        dataHolder.push(
//            rows[random_busi])
//    }
//    //console.log("dataHolder", dataHolder)
//
//    //todo: -------SCALES----------------//
//    var time_extent = d3.extent(rows, function(d){
//
//        return d.Date;
//    })
//    console.log("time_extent", time_extent)
//    var scaleX = d3.time.scale()
//        .domain(time_extent)
//        .range([0, canvasWidth]);
//
//    Name = dataHolder.map(function(d){
//        return busiName.get(d.busId);
//    })
//    console.log(Name)
//
//
//    var scaleY = d3.scale.ordinal()
//        .domain(Name)
//        .rangeBands([0, canvasHeight])
//    // .range([canvasWidth - padding, padding]);
//
//
//
//// Define X axis
//    var xAxis = d3.svg.axis()
//        .scale(scaleX)
//        .orient("top")
//        .ticks(11)
//        .tickFormat(d3.time.format("%Y"))
//
//
//// Define Y axis
//    var yAxis = d3.svg.axis()
//        .scale(scaleY)
//        .orient("left")
//        //.tickFormat("");
//        .innerTickSize(-canvasWidth)
//        .outerTickSize(0)
//        .tickPadding(1)
//    //.tickOpacity(0.3);
//
//
//
////-------TODO: COLOR SCALE-------//
//    var colorScale = d3.scale.linear()
//        .domain([starsMin, starsMax])
//        .range(["#c41200", "#ce882c", "#f5f5f5"]);
//
//
//
//// SVG canvas
//    //console.log(canvasWidth + margin.left + margin.right, canvasHeight + margin.top + margin.bottom)
//    var svg = d3.select("#canvas-3")
//        .append("svg")
//        .attr("width", (canvasWidth + 2300 ))
//        .attr("height", (canvasHeight + 40))
//        .append("g")
//        .attr("transform", "translate(" + 180 + "," + 40 + ")");
//
//
////todo: -----heat map------//
//// Clip path
//    svg.append("clipPath")
//        .attr("id", "clip")
//        .append("rect")
//        .attr("width", canvasWidth)
//        .attr("height", canvasHeight);
//
//    console.log(dataHolder);
//
//    svg.append("g")
//        .attr("clip-path", "url(#clip)")
//        .selectAll("ellipse")
//        .data(dataHolder)
//        .enter()
//        .append("ellipse")
//        .attr("cx", function (d) {
//            //console.log(busiName.get(d.busId))
//            return scaleX(d.Date);
//        })
//        .attr("cy", function (d) {
//            return scaleY(busiName.get(d.busId));
//
//        }) // PLOT THE DOT ACCORING TO REVIEW DATE - Color it by star
//        .attr("rx", function (d) {
//            return (d.Stars);
//        })
//        .attr("ry", function (d) {
//            return (d.Stars);
//        })
//        .attr("fill", function (d) {
//            return colorScale(d.Stars);
//        });
//
//    //.attr("rx", dotWidth)
//    //.attr("ry", dotHeight)
//
//
////todo: -----heat map------//
////Create X axis
//    svg.append("g")
//        .attr("class", "x axis")
//        //.attr("transform", "translate(0,0"  + ")")
//        //.attr("transform", "translate(0," + (canvasHeight - padding) + ")")
//        .call(xAxis)
//
////Create Y axis
//    svg.append("g")
//        .attr("class", "y axis")
//        .call(yAxis);
//
//
//}







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
