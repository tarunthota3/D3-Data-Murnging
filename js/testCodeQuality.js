var a = [1,2,3,4];
var b= [2,3,4,5,6];
var ans = [];
for(var i of a){
  if(!b.includes(i)){
        ans.push(i);
  }
}
for(var i of b){
  if(!a.includes(i)){
        ans.push(i);
  }
}
console.log(ans);
