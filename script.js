
//Set up drawing environment with margin conventions
var margin = {t:20,r:20,b:50,l:50};

BussinessDataLoad();

var CategoriesDataRecord = [null];
var CategoriesNumberArrary = [null];
var TypeData = null;
var GroupData = null;
var GroupArrary = null;
var KeyWord = null;
var StatesName = null;

function BussinessDataLoad()
{
	queue()
	.defer(d3.csv,'Data/Categories-Yelp.csv',parseTwo)
	.defer(d3.csv,'Data/yelp-business.csv',parse)
	.await(dataLoaded);
}

function dataLoaded(err,Type,Bussiness)
{
	StatesName = GetStates(Bussiness);
	console.log(StatesName);
	KeyWord = "PA";
	CategoriesDataRecord = TranslateData(Bussiness);
	CategoriesNumberArrary = FilterData(Bussiness,CategoriesDataRecord)
	TypeData = AdditionalChange(CategoriesDataRecord,CategoriesNumberArrary,Type);
	GroupData = NestGroupData(TypeData);
	console.log(GroupData);
	GroupArrary = GroupDataArrary(GroupData);
	DrawPieChart(GroupArrary);
}

function parse(rows)
{	
	return {
		BusinessId : rows.business_id,
		Categories : CategoriesName(rows.categories),
		City : rows.city,
		Address : rows.full_address,
		OpenTime : rows.hours,
		Latitude : +rows.latitude,
		Longitude : +rows.longitude,
		Name : rows.name,
		Neighborhoods : rows.neighborhoods,
		Ifopen : rows.open,
		Review : +rows.review_count,
		Stars : +rows.stars,
		States : rows.state,
		Type : rows.type
	}
}

function parseTwo(rows)
{
	return {
		BussinessCategory: rows.Category,
		BussinessGroup: rows.Group
	}
}

function CategoriesName(Business)
{						
	var NewString = Business.replace("[","");
		NewString = NewString.replace("]","");
		NewString = NewString.split(",");
		return NewString;
}

function TranslateData(Business)
{
	var TemporyRecord = [null];
	for(var i=0;i<Business.length;i++)
		{
			if(Business[i].States == KeyWord)
				{
					for(var j=0;j<Business[i].Categories.length;j++)
						{
								for(var z=0;z<TemporyRecord.length;z++)
									{
										if(TemporyRecord[z]==Business[i].Categories[j])
											{
												break;
											}
										else
											{
												if(z==(TemporyRecord.length-1))
													{
														TemporyRecord.push(Business[i].Categories[j])
														break;
													}
											}
									}
						}					
				}
		}
	TemporyRecord.shift();
	return TemporyRecord;
}

function FilterData(Bussiness,CategoriesDataRecord)
{	
	var StatesBussiness = [null];
	for(var i=0; i<Bussiness.length;i++)
		{
			if(Bussiness[i].States == KeyWord)
				{
					StatesBussiness.push(Bussiness[i]);
				}
		}
	
	StatesBussiness.shift();
	
	var croosFilterChange = crossfilter(StatesBussiness);
	
	var CategoryFilter = croosFilterChange.dimension(function(d)
	{
		return d.Categories;
	})
	
	var TemporyDataRecord = [null];
	
	for(var i=0;i<CategoriesDataRecord.length;i++)
		{
			TotleNumberCategoriesForeach = CategoryFilter.filter(function(d) 
			{
				if (d.indexOf(CategoriesDataRecord[i]) < 0) 
				{
					return false;
				}
				return true
			})
			.top(Infinity);
			TemporyDataRecord.push(TotleNumberCategoriesForeach.length);
		}
	
	TemporyDataRecord.shift();
	
	return TemporyDataRecord;
}

function AdditionalChange(CategoriesData,CategoriesNumberData,Type)
{
	var TemporyDataRecord = [{Categories:null,ValueNumber:null,Group:null}];
	for(var i=0;i<CategoriesData.length;i++)
		{
			for(var j=0;j<Type.length;j++)
				{
					var JudgeString = '"'+ CategoriesData[i] + '"';
					if(Type[j].BussinessCategory == JudgeString)
						{
							TemporyDataRecord.push({Categories:CategoriesData[i],ValueNumber:CategoriesNumberData[i],Group:Type[j].BussinessGroup});
							break;
						}
				}
		}
	
	TemporyDataRecord.shift();
	return TemporyDataRecord;
}

function NestGroupData(TypeData)
{
	var TemporyDataRecord = [{Group:null,Value:null}];
	for(var i=0;i<TypeData.length;i++)
		{
			for(var j=0;j<TemporyDataRecord.length;j++)
				{
					if(TypeData[i].Group == TemporyDataRecord[j].Group)
						{
							TemporyDataRecord[j].Value = TemporyDataRecord[j].Value + TypeData[i].ValueNumber;
							break;
						}
					else if(j==TemporyDataRecord.length-1)
						{
							TemporyDataRecord.push({Group:TypeData[i].Group,Value:TypeData[i].ValueNumber});
							break;
						}
				}
		}
	
	TemporyDataRecord.shift();
	return TemporyDataRecord;
}

function GroupDataArrary(GroupData)
{
	var TemporyDataRecord = [null];
	for(var i=0;i<GroupData.length;i++)
		{
			TemporyDataRecord.push(GroupData[i].Value);
		}
	
	TemporyDataRecord.shift();
	return TemporyDataRecord;
}

function GetStates(Business)
{
	var TemporyDataRecord = [null];
	for (var i=0;i<Business.length;i++)
		{
			for(var j=0;j<TemporyDataRecord.length;j++)
				{
					if(TemporyDataRecord[j]==Business[i].States)
						{
							break;
						}
					else if(j==TemporyDataRecord.length-1)
						{
							TemporyDataRecord.push(Business[i].States);
							break;
						}
				}
		}
	
	TemporyDataRecord.shift();
	return TemporyDataRecord;
}


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

