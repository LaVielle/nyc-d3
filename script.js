/*
*	Use the following commands in Terminal to allow cross origin policy override in Chorme:
*	1. open -a Google\ Chrome --args --disable-web-security
*	2. -–allow-file-access-from-files
*	3. /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="/tmp/chrome_dev_session" --disable-web-security
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

// !!NOT WORKING!! Converting values into Int data type
//////////////////////////////////////////
	function toInt(x){
		return parseInt(x);
	}

	for (i=0;i<waterData.length;i++){
		parseInt(waterData[i].year)
		parseInt(waterData[i].total)
		parseInt(waterData[i].per_capita)
	}

	//tests
	/*
	console.log(typeof waterData[0].total);
	console.log(waterData[0].total+waterData[1].total);
	console.log(waterData.length);
	console.log(waterData[waterData.length-1]);
	*/
//////////////////////////////////////////


//Setting up box for barchart
	var margin = {top: 30, right: 30, bottom: 35, left: 40}

	var height = 400 - margin.top - margin.bottom,
		width = 600 - margin.left - margin.right,
		barWidth = 50,
		barOffset = 5;

//Preparing x and y scales
	var xScale = d3.scale.ordinal()

		.domain(d3.range((d3.min(data, function(d) {return d.year;})),(d3.max(data, function(d) { return d.year; }))))
		.rangeBands([0, width], 0.2)

	var yScale = d3.scale.linear()

		.domain([(d3.min(data, function(d) {return d.total;})),(d3.max(data, function(d) { return d.total; }))])
		.range([0, height])

	//tests
	/*
	console.log((d3.min(data, function(d) {return d.total;})));
	console.log((d3.max(data, function(d) {return d.total;})));
	console.log((d3.max(data, function(d) {return d.total;}))-(d3.min(data, function(d) { return d.total; })));

	console.log((d3.min(data, function(d) {return d.year;})));
	console.log((d3.max(data, function(d) {return d.year;})));
	console.log((d3.max(data, function(d) {return d.year;}))-(d3.min(data, function(d) { return d.year; })));
	*/


//Making chart
	var waterChart = d3.select('#chart').append('svg')
		.style('background', '#E7E0CB')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate('+margin.left+','+margin.top+')')
		.selectAll('rect').data(waterData)
		.enter().append('rect')
			.style('fill', '#000000')
			//check rangeBand vs rangeBands, with an S
			.attr('width', xScale.rangeBand())
			.attr('heigh', 0)
			.attr('x', function(d,i){
				return xScale(i);
			})
			.attr('y', height)



//Closing d3.csv function
})














