module.exports = function convertCsv(startYear) {
  if (typeof startYear !== 'number' || isNaN(startYear)) {
       throw new Error('Not a number');
  }
  const fs = require('fs');
  const readLine = require('readline');
  let barArr = [];
  let lineArr = [];
  for(let i = startYear; i <= 2016; i = i + 1) {
    let bobj = {year: i, OVER$500: 0, $500ANDUNDER: 0};
    let lobj = {year: i, ARRESTED: 0, NOTARRESTED: 0};
    barArr.push(bobj);
    lineArr.push(lobj);
  }
  let rd = readLine.createInterface({
    input: fs.createReadStream('inputdata/crimedata.csv'),
    output: process.stdout,
    terminal: false
  });
  rd.on('line', function(line) {
    let data = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
    let id = data[0] + '';
    if(id.length <= 4) {
     return;
    }
    let year = data[17];
    let arrested = data[8];
    let type = data[6];
    if(data[5] === 'ASSAULT') {
      if(arrested === 'TRUE' || arrested === 'true') {
        lineArr[year - 2001].ARRESTED = lineArr[year - 2001].ARRESTED + 1;
      }
      else if(arrested === 'FALSE' || arrested === 'false') {
        lineArr[year - 2001].NOTARRESTED = lineArr[year - 2001].NOTARRESTED + 1;
      }
    }
    if(type === 'OVER $500') {
      barArr[year - 2001].OVER$500 = barArr[year - 2001].OVER$500 + 1;
    }
    else if(type === '$500 AND UNDER') {
      barArr[year - 2001].$500ANDUNDER = barArr[year - 2001].$500ANDUNDER + 1;
    }
  });
  rd.on('close', function() {
    fs.writeFileSync('outputdata/linejson.json', JSON.stringify(lineArr));
    fs.writeFileSync('outputdata/barjson.json', JSON.stringify(barArr));
  });
  return 'JSON written successfully';
};
