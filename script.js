

//---------Setting up the canvas --------------//
 canvas0Width = document.getElementById('canvas-1').clientWidth,
    canvas0Height = document.getElementById('canvas-1').clientHeight;

 canvas3Width = document.getElementById('canvas-3').clientWidth,
    canvas3Height = document.getElementById('canvas-3').clientHeight;

 margin = {t: 10, r: 150, b: 150, l: 160};
 plotWidth = canvas0Width - margin.l - margin.r,
    plotHeight = canvas0Height - margin.t - margin.b;

 canvasWidth = canvas3Width - margin.l - margin.r,
    canvasHeight = (canvas3Height - margin.t - [margin.b]) ;

//var padding = 100;


//console.log(canvasWidth, canvasHeight)
 CategoriesDataRecord = [null];
 CategoriesNumberArrary = [null];
 TypeData = null;
 GroupData = null;
 GroupArrary = null;
 //KeyWord = null;
 StatesName = null;

KeyWord = "All";
BussinessDataLoad();



//TODO:-------------------------------------  HEAT MAP  ---------------------------------------//

//Setting up and importing the data
yearslist = ["105", "106", "107", "108", "109","110", "111", "112", "113", "114", "115"];

function DrawHeatMap(rows, busiName, AveStars,Bussiness) {
    console.log("Bussiness",Bussiness);


//setting up the min and max for the color scale // that will relate to the STARS connected reviews
    var starsMin = d3.min(rows, function (d) {
            return d.Stars; }),
        starsMax = d3.max(rows, function (d) {
            return d.Stars; });


//features for the dots -- if needed (this was before I decided to use Star min and max for the R)
    var dotWidth = 7,
        dotHeight = 7,


//setting us the average stars calculator
average_vals = AveStars.entries()       //average values
console.log("AveStars",AveStars)
console.log("rows", rows);


//to generate 80 businesses from the category
    dataHolder = [];    //introducing it
    aver_start_data = []
    var countSel = 80;              //the number we want displayed

//connecting the first scroll down tab
    for (var i = 0; i < countSel; i++) {
        random_busi = Math.floor(Math.random() * rows.length)
        if(KeyWord!="All") {
            for(var z=0;z<Bussiness.length;z++) {
                if(rows[random_busi].busId == Bussiness[z].BusinessId) {
                    if(Bussiness[z].States == KeyWord) {
                        dataHolder.push(
                            rows[random_busi]);
                        console.log(rows[random_busi]);
                        console.log(Bussiness[z].States);

                        break;
                    }
                    else
                    {
                        i=i-1;
                        break;
                    }
                }
            }
        }
        else
        {
            dataHolder.push(
            rows[random_busi])
        }

        //console.log(rows[random_busi]);
    }

    //Data holder basically holds the average stars, the year, buisnesess ID, and the dates associcated with the stars
    dataHolder.forEach(function(d){
        console.log("dataholder", d)

        var busId = d.busId;
        yearslist.forEach(function(yearstr){
            var aver_str = AveStars.get([d.busId, yearstr]);
           if(aver_str >= 0){
               //console.log("aver_str", aver_str)
               aver_start_data.push({"busId": d.busId, "year": yearstr, "average_star": aver_str})
           }

        })

    })
    console.log("aver_start_data",aver_start_data)


//todo: -------SCALES----------------//
    var time_extent = d3.extent(rows, function(d){
        return d.Date;

    })
    console.log("canvasWidth",canvasWidth)
    console.log("time_extent", time_extent)


//Setting up X and Y scale
    var scaleX = d3.scale.ordinal()
        .domain(yearslist)
        //.text("Keyword")
        .rangePoints([0, canvasWidth]);


    Name = dataHolder.map(function(d){
        //return AveStars.get(d.Stars);
        return busiName.get(d.busId);
    })
    console.log("name",Name);


    var scaleY = d3.scale.ordinal()
        .domain(Name)
              .rangePoints([0, canvasHeight - 150])


//Setting up the axis related to the scales
    var xAxis = d3.svg.axis()
        .scale(scaleX)
        .orient("top")
        .tickPadding(4)
        //.outerTickSize(10)
        .tickFormat(function(d) {
            return d-100+2000;
        })



    var yAxis = d3.svg.axis()
        .scale(scaleY)
        .orient("left")
        //.tickFormat("");
        .innerTickSize(-canvasWidth)
        .outerTickSize(0)
        .tickPadding(8)




//TODO:------------------ COLOR SCALE------------------------//
    var colorScale = d3.scale.linear()
        .domain([starsMin, starsMax])
        .range(["#33A1C9", "#DC143C"]);



// SVG canvas for the drawing of the heatmap
    var svg = d3.select("#canvas-3")
        .append("svg")
        .attr("id","HeatMapsvg")
        .attr("width", ((canvasWidth ) + 320 ))
        .attr("height", ((canvasHeight) + 40))
        .append("g")
        .attr("transform", "translate(" + 200 + "," + 20 + ")");

//Drawing the axis inside the appended SVG
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)


// Clip path basically stops the appended circles from being drawn ON the axis.. but We like the way the look normal.
//    svg.append("clipPath")
//        .attr("id", "clip")
//        .append("rect")
//        .attr("width", canvasWidth)
//        .attr("height", canvasHeight);

    console.log("dateHolder" ,dataHolder);

    //appending the G where we draw the heatmap with it's circles
    svg.append("g")
        .attr("clip-path", "url(#clip)")
        .selectAll("ellipse")
        .data(aver_start_data)
        .enter()

        .append("ellipse").call(attachTooltip)
        .attr("cx", function (d) {
            //console.log(busiName.get(d.busId))
            //console.log(scaleX(d.year))
            return scaleX(d.year);

        })
        .attr("cy", function (d) {
            //return scaleY(AveStars.get(yearbusiness.average));
           return scaleY(busiName.get(d.busId));
           // console.log(AveStars.get([d.busId, new Date(d.Date).getYear()]))
           //return scaleY();
           //return scaleY(AveStars.get([Bussiness.business_id, new Date(d.Date).getYear()]));
           //return scaleY(AveStars.get(d.Stars, d.Date));//

        })

        //.attr("rx", dotHeight)
        //})
        .attr("rx", function (d) {
            return 1.5*(d.average_star);
        })
        //.attr("ry", dotWidth)
        //})
        .attr("ry", function (d) {
            return 1.5*(d.average_star);
        })

        .attr("fill", "#DC143C");//to make the color uniform
        //.attr("fill", function (d) {
        //    return colorScale(d.average_star);
        //});



//todo: ------------------tooltip--------------------------//
    function attachTooltip(selection) {
        selection
            .on('mouseenter', function (d) {
                var tooltip = d3.select('.custom-tooltip');
                console.log(tooltip, d);
                tooltip
                    .transition()
                    .style('opacity', 1);

                tooltip.select('#aver_str').html(d.average_star);
            })
            .on('mousemove', function () {
                var yx = d3.mouse(svg.node());

                var tooltip = d3.select('.custom-tooltip');

                tooltip
                    .style('left', yx[0] )
                    .style('top', yx[1] );
            })
            .on('mouseleave', function () {
                var tooltip = d3.select('.custom-tooltip')
                    .transition()
                    .style('opacity', 0);
            });
    }

}



