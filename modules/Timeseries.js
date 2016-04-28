d3.Timeseries = function(){

	var _dis = d3.dispatch('hover','showValue');

	//Internal veriables
	var w = 800,
		h = 600,
		m = {t:50, r:25, b:50, l:25},
		chartW = w - m.l - m.r,
		chartH = h - h.t - h.b,
		timeRange = [new Date(), new Date()],
		binSize = d3.time.year,
		interval = d3.time.day,
		valueAccessor = function(d){
			return d.Date;},
		maxY = 13000,
		layout = d3.layout.histogram()
			.value(valueAccessor)
			.range(timeRange)
			.bins(binSize.range(timeRange[0],timeRange[1]));



	var scaleX = d3.time.scale().range([0,chartW]).domain(timeRange),
		scaleY = d3.scale.linear().range([chartH,0]).domain([0,maxY]);

	var DataArray = [];
	var MaxYNO = 0;


	brush = d3.svg.brush(),
		scales = true,
		brushable = false;

	//exports
	function exports(_selection){



		var bins = binSize.range(timeRange[0],timeRange[1]);
		bins.unshift(timeRange[0]);
		bins.push(timeRange[1]);

		layout
			.range(timeRange)
			.bins(bins);

		chartW = w - m.l - m.r,
			chartH = h - m.t - m.b;

		scaleX.range([0,chartW]).domain(timeRange);
		scaleY.range([chartH,0]).domain([0,maxY]);

		_selection.each(function(_d){

			var bisect = d3.bisector(function(d){return d.x}).left;

			console.log(_d);
			var data = layout(_d)
			var Maxdata = [layout(_d)];

//			console.log(Maxdata);

//			console.log(Maxdata);

			for(var i=0;i<Maxdata[0].length;i++)
			{
				DataArray[i] = Maxdata[0][i].y;
			}
//
			MaxYNO = d3.max(DataArray);
//			console.log(MaxYNO);

			console.log(DataArray);

			maxY = MaxYNO;

			console.log(maxY);
//
			scaleX.range([0,chartW]).domain(timeRange),
				scaleY.range([chartH,0]).domain([0,maxY]);

			var line = d3.svg.line()
				.x(function(d){ return scaleX(d.x.getTime() + d.dx/2)})
				.y(function(d){ return scaleY(d.y)})
				.interpolate('basis');
			var area = d3.svg.area()
				.x(function(d){ return scaleX(d.x.getTime() + d.dx/2)})
				.y0(chartH)
				.y1(function(d){ return scaleY(d.y)})
				.interpolate('basis');
			var axisX = d3.svg.axis()
				.orient('bottom')
				.scale(scaleX)
				.ticks(d3.time.year);
//					console.log(area);
//			var svg = d3.select(this)
//			.append('svg')
//			.data([_d]);

			var svg = d3.select(this)
				.selectAll('svg')
				.data([_d]);

			var svgEnter = svg.enter()
				.append('svg');

			svgEnter
				.append('g')
				.attr('class','area')
				.attr('transform','translate('+m.l+','+m.t+')')
				.append('path');

			svgEnter
				.append('g')
				.attr('class','line')
				.attr('transform','translate('+m.l+','+m.t+')')
				.append('path');

			svgEnter
				.append('g')
				.attr('class','axis')
				.attr('transform','translate('+m.l+','+(m.t+chartH)+')');

			var tooltipEnter = svgEnter.append('g').attr('class','tool-tip');
			tooltipEnter.append('circle').attr('class','tool-tip-circle').attr('r',2);
			tooltipEnter.append('text').attr('class','tool-tip-text').attr('text-anchor','middle').attr('dy',-5);

			svgEnter.append('rect').attr('class','mouse-target').attr('transform','translate('+m.l+','+m.t+')')
				.attr('width',chartW)
				.attr('height',chartH)
				.style('fill-opacity',0)
				.on('mousemove', function(){
					var xy = d3.mouse(this),
						t = scaleX.invert(xy[0]);

					_dis.hover(t);
				});

			svg
				.attr('width',w)
				.attr('height',h)

			svg.select('.area')
				.select('path')
				.datum(data)
				.attr('d',area);

			svg.select('.line')
				.select('path')
				.datum(data)
				.attr('d',line);

//MUST BE INSIDE FUNCTION
			//if(!brushable){
			//	svg.select('.brush').empty();
			//}else{
			//	brush
			//		.on('brush',brushed)
			//		.on('brushend',brushend);
			//	svg.select('.brush').call(brush)
			//		.selectAll('line')
			//		.attr('height',chartH);
			//}
			//
			//function brushed(){
			//	bars.attr('class','line')
			//		.filter(function(d){
			//			return d.x >= brush.extent()[0] && d.x <= brush.extent()[1];
			//		})
			//		.attr('class','bar highlight');
			//}
			//
			//function brushend(){
			//	_dis.updateextent(brush.extent());
			//}




			svg.select('.axis')
				.call(axisX);

			//show value based on argument t
			_dis.on('showValue',function(t){
				var index = bisect(data, t),
					v = data[index];

				var xPos = scaleX(v.x.getTime() + v.dx),
					yPos = scaleY(v.y);

				svg.select('.tool-tip').attr('transform','translate('+ (m.l+xPos) +','+ (m.t+yPos)+')')
					.select('.tool-tip-text').text(v.y);
			});

		});

	}

	//Getter and setter funcation
	exports.width = function(_x){
		if(!arguments.length)
		{
			return w;
		}
		w = _x;
		return this;
	}
	exports.height = function(_x)
	{
		if(!arguments.length)
		{
			return h;
		}
		h = _x;
		return this;
	}

	exports.timeRange = function(_r){
		if(!arguments.length)
		{
			return timeRange;
		}
		timeRange = _r;
		return this;
	}

	exports.binSize = function(interval)
	{
		if(!arguments.length)
		{
			return binSize;
		}
		binSize = interval;
		return this;
	}

	exports.valueAccessor = function(access){
		console.log(access);
		if(!arguments.length)
		{
			return valueAccessor;
		}
		valueAccessor = access;
		return this;
	}
	exports.value = function(_v){
		if(!arguments.length) return layout.value();
		valueAccessor = _v;
		layout.value(_v);
		return this;
	}
	exports.maxY = function(_y){
		if(!arguments.length)
		{
			return maxY;
		}
		else {
			maxY = _y;
			return this;
		}
	}

	//exports.brushable = function(_b){
	//	if(!arguments.length) return brushable;
	//	brushable = _b;
	//	return this;
	//}

	d3.rebind(exports, _dis, 'on', 'showValue');

	return exports;
}
