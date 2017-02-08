module.exports = (startdate, enddate)=> {
const fs = require('fs');
let rl = require('readline').createInterface({
	input: fs.createReadStream('Indicators.csv'),
	terminal: false
});
let arr = [];
let arr2 = [];
let arr3 = [];
let rural;
let rural1 = [0, 0, 0, 0, 0];
let urban1 = [0, 0, 0, 0, 0];
let country = ['INDIA', 'CHINA', 'NEPAL', 'PAKISTAN', 'BHUTAN'];
let temp;
//validation of start date and end date
if(isNaN(startdate) && isNaN(enddate)
	|| typeof startdate !== 'number' || typeof enddate !== 'number') {
	throw new Error('Not a number');
}
rl.on('line', function(line) {
	let arr1 = line.split(',');
	let obj = {};
	let obj1 = {};
	if(arr1[1] === 'IND' && (arr1[4] >= startdate && arr1[4] <= enddate)
		&& arr1[3] === 'SP.RUR.TOTL.ZS') {
		rural = arr1[5];
		// console.log(rural);
	}
	//getting the values of india's % of total population and %of total and storing it in an array
	if(arr1[1] === 'IND' && (arr1[4] >= startdate &&
		arr1[4] <= enddate) && arr1[3] === 'SP.URB.TOTL.IN.ZS') {
		obj.year = arr1[4];
		obj['Rural population (% of total population)'] = rural;
		obj['Urban population (% of total)'] = arr1[5];
		arr.push(obj);
	}
	//getting the total annual 5 of urban population growth in an array
	if(arr1[1] === 'IND' && arr1[3] === 'SP.URB.GROW') {
		obj1.year = arr1[4];
		obj1['Urban population growth (annual %)'] = arr1[5];
		arr2.push(obj1);
	}

	if(arr1[1] === 'IND' && arr1[3] === 'SP.RUR.TOTL') {
		rural1[0] = rural1[0] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'IND' && arr1[3] === 'SP.URB.TOTL') {
		urban1[0] = urban1[0] + parseInt(arr1[5], 10);
	}

	if(arr1[1] === 'CHN' && arr1[3] === 'SP.RUR.TOTL') {
		rural1[1] = rural1[1] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'CHN' && arr1[3] === 'SP.URB.TOTL') {
		urban1[1] = urban1[1] + parseInt(arr1[5], 10);
	}

	if(arr1[1] === 'NPL' && arr1[3] === 'SP.RUR.TOTL') {
		rural1[2] = rural1[2] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'NPL' && arr1[3] === 'SP.URB.TOTL') {
		urban1[2] = urban1[2] + parseInt(arr1[5], 10);
	}

	if(arr1[1] === 'PAK' && arr1[3] === 'SP.RUR.TOTL') {
		rural1[3] = rural1[3] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'PAK' && arr1[3] === 'SP.URB.TOTL') {
		urban1[3] = urban1[3] + parseInt(arr1[5], 10);
	}

	if(arr1[1] === 'BTN' && arr1[3] === 'SP.RUR.TOTL') {
		rural1[4] = rural1[4] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'BTN' && arr1[3] === 'SP.URB.TOTL') {
		urban1[4] = urban1[4] + parseInt(arr1[5], 10);
	}
});
rl.on('close', function() {
	//converting the array to json and storing it in a file linechart.json
	fs.writeFile('linechart.json', JSON.stringify(arr));
	//converting the array to json and storing it in a file areachart.json
	fs.writeFile('areachart.json', JSON.stringify(arr2));
	//storing the details of asia's five countries and storing it in an array
	for(let j = 0; j < country.length; j = j + 1) {
		arr3.push({country: country[j], rural: rural1[j], urban: urban1[j]});
	}
	//checking the urban + rural population and based on that decending the array and storing it in same array
	for(let i = 0; i < arr3.length; i = i + 1) {
		for(let j = 0; j < arr3.length - 1; j = j + 1) {
			if(arr3[j].rural + arr3[j].urban < arr3[j + 1].rural + arr3[j + 1].urban) {
				temp = arr3[j];
				arr3[j] = arr3[j + 1];
				arr3[j + 1] = temp;
			}
		}
	}
	//converting the array to json and storing it in a file stackedbarchart.json
	fs.writeFile('stackedbarchart.json', JSON.stringify(arr3));
});
return 'JSON written successfully';
};
