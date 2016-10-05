/*
*	Use the following command in Terminal to allow cross origin policy override in Chorme:
*	/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="/tmp/chrome_dev_session" --disable-web-security
*/

//Array that will contain the data
var waterData = [];

//Importing data from csv file

d3.csv('nyc_water_co.csv', function(data){

//Storing the data in waterData, ordering data by year: 1979 -> 2009
	for (i=0;i<data.length;i++){
		waterData.splice(0, 0, data[i])
	}

//Converting values into Int data type
	for (i=0;i<waterData.length;i++){
		waterData[i].year = parseInt(waterData[i].year, 10)
		waterData[i].total = parseInt(waterData[i].total, 10)
		waterData[i].per_capita = parseInt(waterData[i].per_capita, 10)
	}

//Setting up box for barchart
	//Will set margin later
	//var margin = {top: 30, right: 30, bottom: 35, left: 40}
	var height = 400,
		width = 600,
		barWidth = 50,
		barOffset = 5;

//Setting color scale
//NOT WORKING
	var colors = d3.scale.linear()
		.domain([0, d3.max(data, function(d) {return d.total;})])
		.range(['#FFB832', '#C61C6F'])

//Preparing x and y scales
	var yScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.total;})*0.75, d3.max(data, function(d) {return d.total;})])
		.range([0, height])

	var xScale = d3.scale.ordinal()
		.domain(d3.range(0, waterData.length))
		.rangeBands([0, width])

//Preparing tooltip
	var tooltip = d3.select('body').append('div')
		.style('position', 'absolute')
		.style('font-size', '.6em')
		.style('border-radius', '2px')
		.style('padding', '0 5px')
		.style('background', 'white')
		.style('opacity', 0)

//Making chart
	var waterChart = d3.select('#chart-tot').append('svg')
		.style('background', '#FFFFFF')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		//.attr('transform', 'translate('+margin.left+','+margin.top+')')
		.selectAll('rect').data(waterData)
		.enter().append('rect')
			.style('fill', '#7C97C3')
			.attr('width', xScale.rangeBand)
			.attr('height', 0)
			.attr('x', function(d,i){
				return xScale(i);
			})
			.attr('y', height)
//Making tooltip
		.on('mouseover', function(d){
			tooltip.transition()
				.style('opacity', .9)
			tooltip.html(d.total + " MGD")
				.style('left', (d3.event.pageX - 45) + 'px')
				.style('top', (d3.event.pageY - 40) + 'px')
			d3.select(this)
				.transition()
				.style('opacity', .5)
		})
		.on('mouseout', function(d){
			d3.select(this)
				.transition().delay(100).duration(500)
				.style('opacity', 1)
		})

//Making chart animation
	waterChart.transition()
		.attr('height', function(d){
			return yScale(d.total);
		})
		.attr('y', function(d){
			return height - yScale(d.total);
		})
		.delay(function(d,i){
			return i * 20;
		})
		.duration(500)

//Making x and y axis
	var vGuideScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.total;})*0.75, d3.max(data, function(d) {return d.total;})])
		.range([height, 0])

	var vAxis = d3.svg.axis()
		.scale(vGuideScale)
		.orient('left')
		.ticks(10)

	var vGuide = d3.select('svg').append('g')
		vAxis(vGuide)
		vGuide.attr('transform', 'translate(75, 10)')
		vGuide.selectAll('path')
			.style({fill: "none", stroke: "#000"})
		vGuide.selectAll('line')
			.style({stroke: "#000"})
/*
	var hGuideScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return d.year;}), d3.max(data, function(d) {return d.year;})])
		.range([width, 0])
*/	
	var hAxis = d3.svg.axis()
		.scale(xScale)
		//.scale(hGuideScale)
		.orient('bottom')
//Problem showing tick values
		.tickValues(xScale.domain().filter(function(d,i){
			return !(i % (waterData.length/5));
		}))

	var hGuide = d3.select('svg').append('g')
		hAxis(hGuide)
		hGuide.attr('transform', 'translate(0, '+ (height-30) +')')
		hGuide.selectAll('path')
			.style({fill: "none", stroke: "#000"})
		hGuide.selectAll('line')
			.style({stroke: "#000"})

//Closing d3.csv function
})














