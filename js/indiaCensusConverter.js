module.exports = function convertCsv(startYear){
	if(typeof startYear !== 'number' || isNaN(startYear))
		throw new Error('Not a number');
	const fs = require('fs');
	const readline = require('readline');

	var convertWithStream = () =>{
		var readStream = fs.createReadStream('../../inputdata/India2011_Merge_csv.csv');

		var rli = readline.createInterface({
			input:readStream,
			terminal:false
		});
		var linenumber = 0;
		var jsonArray = [];
		rli.on('line', (line) => {
			if(linenumber === 0){
				linenumber += 1;
			}
			else{
				let values = line.split(',');
				if(jsonArray.length > 0)
				{
					let agegroupFound = false;
					for(let json of jsonArray){
						if(json.AgeGroup === values[5] && values[5] !== 'All ages' && values[4] === 'Total'){
							json.LiteratePopulation = Number(json.LiteratePopulation)+Number(values[12]);
							agegroupFound = true;
							break;
						}
					}
					if(!agegroupFound  && values[5] !== 'All ages' && values[4] === 'Total'){
						let json = {'AgeGroup':values[5],'LiteratePopulation': values[12]};
						jsonArray.push(json);

					}
				}
				else{
					if(values[5] !== 'All ages' && values[4] === 'Total')
					{
					let json = {'AgeGroup' : values[5], 'LiteratePopulation' : values[12]};
	        		jsonArray.push(json);
	        		}
				}
			}
		});
		rli.on('close', () =>  fs.writeFileSync('json1.json', JSON.stringify(jsonArray)));
	}
	convertWithStream();
	return 'JSON written successfully';
};