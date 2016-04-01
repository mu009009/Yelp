function DrawPieChart(Business)
{
//	console.log(Business);
	var BusinessData = Business
	var WidthPx = null;
	var HeightPX = null;
	var PieSvg = d3.select("#container1")
	.append('svg')
	.attr('class','svg')
	.attr('id','PIeChartSvg')
	.style('width',function()
	{
		WidthPx = document.getElementById('container1').offsetWidth;
		return WidthPx + 'px';
	})
	.style('height',function()
	{
		HeightPX = document.getElementById('container1').offsetHeight*0.5;
		return HeightPX + 'px';
	});
	
	var OutRadius = HeightPX/(2.5);
	var InnerRadius = HeightPX/7;
	
	var Arc = d3.svg.arc()  
    .innerRadius(InnerRadius)  
    .outerRadius(OutRadius);  
	
	var Pie = d3.layout.pie();
	
	var Xposition = document.getElementById('container1').offsetWidth*0.5;
	var Yposition = document.getElementById('PIeChartSvg').offsetHeight*0.2;
	
	 var color = d3.scale.category10();
	
	 var arcs = PieSvg.selectAll("g")  
         .data(Pie(BusinessData))  
         .enter()  
         .append("g")  
         .attr("transform","translate("+OutRadius+","+InnerRadius+")");
	
	 arcs.append("path")  
            .attr("fill",function(d,i){  
		 			var number = i%80;
		 		return color(i);
//                return "rgb(" + "(255," + "255," + (255*(i%80*0.1)).toString()+")" ;  
            })  
            .attr("d",function(d){  
                return Arc(d);  
            })
			.attr("transform", function()
			{
				Xposition = document.getElementById('container1').offsetWidth*0.6;
				Yposition = document.getElementById('PIeChartSvg').offsetHeight*0.35;
				var CircleString = "translate(" + Xposition.toString() + "," + Yposition.toString() + ")";
				return CircleString;
			}); 
	
	 arcs.append("text")  
            .attr("transform",function(d){
		 		Xposition = document.getElementById('container1').offsetWidth*0.6;
				Yposition = document.getElementById('PIeChartSvg').offsetHeight*0.35;
                return "translate(" + (Arc.centroid(d)[0]+Xposition) + "," + (Arc.centroid(d)[1]+Yposition) + ")";  
            })  
            .attr("text-anchor","middle")  
            .text(function(d){  
                return d.value;  
            });  
}
