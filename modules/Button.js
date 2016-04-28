var ButtonChangeJudge = 0;
var durationTime = 1200;

function EffectiveStates()
{
	var NewStates = [null];
	NewStates = ["PA","NC","SC","WI","IL","AZ","NV","QC"];

	return NewStates;
}
//
//function DrawButton(StatesName)
//{
//	var ButtonSvg = d3.select("#canvas-3")
//		.append('svg')
//		.attr('class','svg')
//		.attr('id','ButtonSvg')
//		.style('width',function()
//		{
//			var Buttonsvgwidth = document.getElementById('canvas-3').offsetWidth*0.5;
//			return Buttonsvgwidth+'px';
//		})
//		.style('height',function()
//		{
//			var ButtonsvgHeight = document.getElementById('canvas-3').offsetHeight/5;
//			return ButtonsvgHeight;
//		})
//		.style('position','absolute')
//		.selectAll('rect')
//		.data(StatesName)
//		.enter()
//		.append('g');
//
//	var R = null;
//
//	var DrawButton = ButtonSvg
//		.append('rect')
//		.attr('class','rect')
//		.attr('id',function(d)
//		{
//			return d;
//		})
//		.style('fill','#CC3366')
//		.attr("width",window.innerWidth*0.04+"px")
//		.attr("height",function(d) {
//			R =  document.getElementById('ButtonSvg').offsetHeight/9;
//			return R + "px";
//		})
//		.attr("x",2*R)
//		.attr("y",function(d,i)
//		{
//			return R + "px";
////			return i*(R+1) + "px";
//		})
//		.style("z-index",function(d)
//		{
//			if(d==KeyWord)
//			{
//				return 98;
//			}
//			else
//			{
//				return 90;
//			}
//		})
//		.style("opacity",function(d)
//		{
//			if(d==KeyWord)
//			{
//				return 1;
//			}
//			else
//			{
//				return 0;
//			}
//		})
////		.attr('r',function()
////		{
////			R = document.getElementById('PIeChartSvg').offsetHeight/(StatesName.length*4);
////			return R;
////		})
////		.attr("transform", function(d,i)
////		{
////			var Xposition = 0;
////			var Yposition = document.getElementById('PIeChartSvg').offsetHeight*0.05*i + R*2*i + document.getElementById('PIeChartSvg').offsetHeight*0.1;
////			var CircleString = "translate(" + Xposition.toString() + "," + Yposition.toString() + ")";
////				return CircleString;
////		})
//		.on('click',function(d)
//		{
//			if(ButtonChangeJudge == 1)
//			{
//				KeyWord = this.id;
//				ButtonChangeJudge = 0;
//				//BussinessDataLoad();
//			}
//			else{
//				ButtonChangeJudge = 1;
//			}
//
//			d3.selectAll('.rect')
//				.style('z-index',90)
//				.transition()
//				.duration(durationTime)
//				.attr('y',function(d,i)
//				{
//					if(ButtonChangeJudge == 1)
//					{
//						return R+i*(R) + "px";
//					}
//					else
//					{
//						return R + "px";
//					}
//				})
//				.style('opacity',function()
//				{
//					if(ButtonChangeJudge == 1)
//					{
//						return 0.6;
//					}
//					else
//					{
//						if(d==KeyWord)
//						{
//							return 0.6;
//						}
//						else
//						{
//							return 0;
//						}
//					}
//				});
//
//			d3.selectAll('.text')
//				.style('z-index',99)
//				.transition()
//				.duration(durationTime)
//				.attr('y',function(d,i)
//				{
//					if(ButtonChangeJudge == 1)
//					{
//						return 1.7*R+i*(R) + "px";
//					}
//					else
//					{
//						return 1.7*R + "px";
//					}
//				})
//				.style('opacity',function(d)
//				{
//					if(ButtonChangeJudge == 1)
//					{
//						return 1;
//					}
//					else
//					{
//						if(d==KeyWord)
//						{
//							console.log(d);
//							return 0.6;
//						}
//						else
//						{
//							return 0;
//						}
//					}
//				});
////
//			d3.select(this)
//				.style('z-index',98)
//				.style('opacity',1);
//		})
//
//	var AddText = ButtonSvg
//		.append('g')
//		.append('text')
//		.attr('class','text')
//		.style('z-index',99)
//		.attr("text-anchor", "middle")
//		.attr('x',2*R + window.innerWidth*0.01)
//		.attr('y',1.75*R)
////        .attr("transform",function(d,i){
////			var Xposition = 2*R + window.innerWidth*0.01;
////			if(ButtonChangeJudge == 1)
////				{
////					var Yposition = 1.7*R+i*(R);
////				}
////			else
////				{
////					var Yposition = 1.7*R;
////				}
////
////			var CircleString = "translate(" + Xposition.toString() + "," + Yposition.toString() + ")";
////				return CircleString;
////        })
//		.text(function(d){
//			return d;
//		})
//		.style('opacity',function(d)
//		{
//			if(d == KeyWord)
//			{
//				return 1;
//			}
//			else
//			{
//				return 0;
//			}
//		})
//		.style('fill','white');
//}
