/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function(score) {
    let arr= [...score]
    let  k=1
         for(i=0;i<score.length;i++){
   let num=Math.max(...score)
   console.log(num)
    
    let index=0;
   for( var j=0;j<score.length;j++){
     if(num===score[i]){
         index=j
     }

   }
   if(num){
     if(k===1){
         num="Gold Medal"
     }else if(k===2){
        console.log("hwyy")
         num="Silver Medal"
     }else if(k===3){
         num="Bronze Medal"
     }else{
         num=k
     }
    
   }
    k++;
   console.log(k+"this is k")
   
 arr[index]=num
score.shift()

 }
 return arr
};


const resu=findRelativeRanks([5,4,3,2,1])
console.log(resu)