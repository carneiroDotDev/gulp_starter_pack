// 
// function smallestCommons(arr){
//     let small = (arr[0] < arr[1]) ? arr[0] : arr[1];
//     let big   = (arr[1] < arr[0]) ? arr[0] : arr[1];
//     const store = [];
//     let result = 1;
//     let value=0;
//     for (let i=small;i<=big;i++){
//       store.push(i);
//     }
//     if(store[0]===1){store.shift();}
//      for (let i=2;i<10;i++){
//         for (let j=0;j<store.length;j++){
//                eval = ((store[j]%i) === 0);
//                 if(eval){
//                   for (let z=0;z<store.length;z++){
//                       if (store[z]%i === 0){store[z]=store[z]/i;}
//                   }
//                   result= result*i;
//             }
//             }
//             }
//      for (value of store){
//          if (value !== 1){result*=value;}
//      }
//      console.log(result);
//     return result;
// }
// 
// smallestCommons([1,5]);
