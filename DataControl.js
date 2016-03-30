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
	StatesName = EffectiveStates();
	console.log(StatesName);
	CategoriesDataRecord = TranslateData(Bussiness);
	CategoriesNumberArrary = FilterData(Bussiness,CategoriesDataRecord)
	TypeData = AdditionalChange(CategoriesDataRecord,CategoriesNumberArrary,Type);
	GroupData = NestGroupData(TypeData);
	console.log(GroupData);
	GroupArrary = GroupDataArrary(GroupData);
	DrawPieChart(GroupArrary);
	DrawButton(StatesName);
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
