var w = d3.select('.plot').node().clientWidth,
    h = d3.select('.plot').node().clientHeight;

var globalDispatch = d3.dispatch('pickTime');

//function ReviewDataLoaded()
//{
//	queue()
//	.defer(d3.csv,'../data/yelp-reviews-sel.csv',parse)
//	.defer(d3.csv,'../data/yelp-business-sel.csv',parseBusiness)
//	.await(dataLoaded);
//}

function DrawTimeS(rows,Business){
	
	console.log(rows);
	console.log(Business);
	
//	var timeSeries = d3.Timeseries()
//	.width(w)
//	.height(h)
//    .timeRange([new Date(2007,1,1),new Date(2015,12,31)])
//	.value(function(d){ return d.Date; })
//	.maxY(20000)
//    .binSize(d3.time.year);		
	
	var ReviewDate = ReviewNest(rows);
	
	var ReviewNestwithState = ReviewNestAndState(ReviewDate,Business);
	
	var ReviewNestbyStates = ReviewNestByState(ReviewNestwithState);
	console.log(ReviewNestbyStates);
	
    var plots = d3.select('#canvas-1').selectAll('.plot')
        .data(ReviewNestbyStates);		
	
//	console.log(ReviewDate);
//	console.log(timeSeries.value);
	
    //create a <div> for each station
    //bind trips data to each station
//
    plots
        .enter()
        .append('div').attr('class','plot');
	
	    plots
        .each(function(d,i){
            var timeSeries = d3.Timeseries()
                .width(w).height(h)
                .timeRange([new Date(2007,1,1),new Date(2015,12,31)])
                .value(function(d){ return d.Date; })
                .maxY(20000)
                .binSize(d3.time.month)
                .on('hover',function(t){
                    globalDispatch.pickTime(t);
                });

            globalDispatch.on('pickTime.'+i, function(t){
                timeSeries.showValue(t);
            });

            d3.select(this).datum(TimeObject(d))
                .call(timeSeries)
                .append('p')
                .text(d.key);

        })
	


//    plots
//        .each(function(d){
//            d3.select(this).datum(TimeObject(d))
//                .call(timeSeries)
//                .append('p')
//                .text(d.key);
//
//        })	
	
	
}

function parse(d)
{
//	var Review = {};
//	console.log(d);
//	
//	Review.busId = d.business_id;
//	Review.Stars = +d.stars;
//	Review.Date = new Date(d.date);
//	
//	return Review;
	return {
		busId: d.business_id,
		Stars: +d.stars,
		Date: new Date(d.date),
	}
}

function parseBusiness(d)
{
	return {
		BusinessId : d.business_id,
		Categories : CategoriesName(d.categories),
		Name : d.name,
		States : d.state
	}
}

//function parse(d){
//    if(+d.duration<0) return;
//	
//    return {
//        duration: +d.duration,
//        startTime: parseDate(d.start_date),
//        endTime: parseDate(d.end_date),
//        startStation: d.strt_statn,
//        endStation: d.end_statn
//    }
//}
//

function parseDate(date){
    var day = date.split(' ')[0].split('/'),
        time = date.split(' ')[1].split(':');

    return new Date(+day[2],+day[0]-1, +day[1], +time[0], +time[1]);
}

function CategoriesName(Business)
{
	var NewString = Business.replace("[","");
		NewString = NewString.replace("]","");
		NewString = NewString.split(",");
		return NewString;
}

function ReviewNest(Review)
{
	var ReviewDate = d3.nest()
	.key(function(d){return d.busId})
	.entries(Review);
	
	return ReviewDate;
}

function ReviewNestAndState(ReviewNest,Business)
{
	var TemporaryArrary = [{BusinessID:null,Values:null,States:null,Name:null}];
	for(var i=0;i<ReviewNest.length;i++)
		{
			TemporaryArrary[i].BusinessID = ReviewNest[i].key;
			TemporaryArrary[i].Values = ReviewNest[i].values;
			for(var z=0;z<Business.length;z++)
				{
					if(Business[z].BusinessId == ReviewNest[i].key)
						{
							TemporaryArrary[i].States = Business[z].States;
							TemporaryArrary[i].Name = Business[z].Name;
							break;
						}
				}
			TemporaryArrary.push({BusinessID:null,Values:null,States:null,Name:null});
		}
	
	TemporaryArrary.pop();
	return TemporaryArrary;
}

function ReviewNestByState(RevieByState)
{
	var ReviewDate = d3.nest()
	.key(function(d){return d.States})
	.entries(RevieByState);
	
	return ReviewDate;
}

function TimeObject(d)
{
	console.log(d);
	var TemporyObject = [{Date:null,Stars:null}]
	
//	for(var i=0;i<d.values[0].Values.length;i++)
//		{
//			TemporyObject[0].Date = d.values[0].Values[i].Date;
//			TemporyObject[0].Stars = d.values[0].Values[i].Stars;
//			TemporyObject.push({Date:null,Stars:null});
//		}
	
	for(var i=0;i<d.values.length;i++)
		{
			for(var z=0;z<d.values[i].Values.length;z++)
				{
					TemporyObject[TemporyObject.length-1].Date = d.values[i].Values[z].Date;
					TemporyObject[TemporyObject.length-1].Stars = d.values[i].Values[z].Stars;
					TemporyObject.push({Date:null,Stars:null});
//					TemporyObject.(push)({Date:d[i].values[z].Values,Stars:d[i].values[z].Stars})
				}
		}
	TemporyObject.pop();
	console.log(TemporyObject);
	return TemporyObject;
}