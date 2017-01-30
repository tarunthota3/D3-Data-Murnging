var chai = require('chai');
var expect = chai.expect;
var jsonDiff = require('./jsondiff');
var totalObjectKeys = require('./totalObjectKeys');
<<<<<<< HEAD
var expectedJSON = require('./expectedjson/lifeExpectancy.json');
var actualJSON = require('../outputdata/Male_Female_Expentency_Nitin.json');
=======
var expectedJSON = require('./expectedjson/expectedJsonvishnu1.json');
var actualJSON = require('../outputdata/newdata.json');
=======
>>>>>>> c1044bae5ade9b91e06c23d96cf55df526bf6aeb
var expectedJSON = require('./expectedjson/expectedjsonRagesh.json');
var actualJSON = require('../outputdata/outputjsonRagesh.json');
>>>>>>> 893ed5415d3673731edb262d692db26861712522
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