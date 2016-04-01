function EffectiveStates()
{
	var NewStates = [null];
	NewStates = ["PA","NC","SC","WI","IL","AZ","NV","QC"];
	
	return NewStates;
}

function DrawButton(StatesName)
{
	var ButtonSvg = d3.select("#PIeChartSvg")
	.selectAll('circle')
	.data(StatesName)
	.enter()
	.append('g');
	
	var R = null;
	
	var DrawButton = ButtonSvg
		.append('circle')
		.attr('class','circle')
		.attr('id',function(d)
		{
			return d;
		})
		.style('fill','red')
		.attr('r',function()
		{
			R = document.getElementById('PIeChartSvg').offsetHeight/(StatesName.length*4);
			return R;
		})
		.attr("transform", function(d,i)
		{
			var Xposition = R;
			var Yposition = document.getElementById('PIeChartSvg').offsetHeight*0.05*i + R*2*i + document.getElementById('PIeChartSvg').offsetHeight*0.1;
			var CircleString = "translate(" + Xposition.toString() + "," + Yposition.toString() + ")";
				return CircleString;
		})
		.on('click',function(d)
		{
			KeyWord = d;
			BussinessDataLoad();
		})
	
	var AddText = ButtonSvg
		.append('text')
		.attr('class','text')
        .attr("transform",function(d,i){
			var Xposition = 2*R;
			var Yposition = document.getElementById('PIeChartSvg').offsetHeight*0.05*i + R*2*i + document.getElementById('PIeChartSvg').offsetHeight*0.1 + R;
			var CircleString = "translate(" + Xposition.toString() + "," + Yposition.toString() + ")";
				return CircleString;
        })  
         .text(function(d){  
            return d;  
        })
}