
//Set up drawing environment with margin conventions
var margin = {t:20,r:20,b:50,l:50};

BussinessDataLoad();

function BussinessDataLoad()
{
	queue()
	.defer(d3.csv,'Data/yelp-business.csv',parse)
	.await(dataLoaded);
}

function dataLoaded(err,Bussiness)
{
	console.log(Bussiness);
}

function parse(rows)
{
	return {
		BusinessId : rows.business_id,
		Categories : rows.categories,
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