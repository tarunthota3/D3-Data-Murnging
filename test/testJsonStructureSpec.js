var chai = require('chai');
var expect = chai.expect;
var jsonDiff = require('./jsondiff');
var totalObjectKeys = require('./totalObjectKeys');
<<<<<<< HEAD
<<<<<<< HEAD
var expectedJSON = require('./expectedjson/expectedJsonMayanka1.json');
var actualJSON = require('../outputdata/outputJsonMayanka1.json');
=======
var expectedJSON = require('./expectedjson/expectedjsonRagesh.json');
var actualJSON = require('../outputdata/outputjsonRagesh.json');
>>>>>>> 893ed5415d3673731edb262d692db26861712522
=======
var expectedJSON = require('./expectedjson/expectedJsonvishnu1.json');
var actualJSON = require('../outputdata/outputJson1Vishnu.json');
>>>>>>> be0ff3f9813143085b93c8e887bd68ce2f10cca9
describe('Test Application as Blackbox', function(){
  it ('Test JSON is well formed', function(done){
    /*ToDO Parse JSON*/
    done();
  });
  it('JSON has expected Number of Objects', function(done){
    var objMatrix = totalObjectKeys.traverse(actualJSON);
    expect(objMatrix.totalNoObjects).to.not.equal(0);
    expect(objMatrix.totalNoKeys).to.not.equal(0);
    done();
  });
  it('Test JSON is as expected', function(done){
    var compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
    expect(compareResult.diffs).equal(0);
    done();
  });
})