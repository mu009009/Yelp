function DeleteThePiePart()
{
	if(d3.select('#PIeChartSvg'))
		{
			d3.select('#PIeChartSvg')
			.remove();
			
			return null;
		}
	return null;
}