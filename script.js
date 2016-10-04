/*
*	Use the following command in Terminal to allow cross origin policy override in Chorme:
*	/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="/tmp/chrome_dev_session" --disable-web-security
*/

//Array that will contain the data
var waterData = [];

//Importing data from csv file
d3.csv('nyc_water_co.csv', function(data){

//Checking if the data was imported
	console.log(data);

//Storing the data in waterData
	for (i=0;i<data.length;i++){
		waterData.push(data[i])
	}

//Converting values into Int data type
	for (i=0;i<waterData.length;i++){
		waterData[i].year = parseInt(waterData[i].year, 10)
		waterData[i].total = parseInt(waterData[i].total)
		waterData[i].per_capita = parseInt(waterData[i].per_capita)
	}

//Setting up box for barchart
	//Will set margin later
	//var margin = {top: 30, right: 30, bottom: 35, left: 40}

	var height = 400,
		width = 600,
		barWidth = 50,
		barOffset = 5;

//Preparing x and y scales
	var yScale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) {return d.total;})])
		.range([0, height])

	var xScale = d3.scale.ordinal()
		.domain(d3.range(0, waterData.length))
		.rangeBands([0, width])

//Making chart
	var waterChart = d3.select('#chart').append('svg')
		.style('background', '#E7E0CB')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		//.attr('transform', 'translate('+margin.left+','+margin.top+')')
		.selectAll('rect').data(waterData)
		.enter().append('rect')
			.style('fill', '#000000')
			.attr('width', xScale.rangeBand())
			.attr('heigh', 0)
			.attr('x', function(d,i){
				return xScale(i);
			})
			.attr('y', height)
			
//Closing d3.csv function
})














