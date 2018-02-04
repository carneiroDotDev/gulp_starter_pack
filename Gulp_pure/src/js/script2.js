
// //Testing the block scope of let and const variables
// function smallestCommons(arr){
//     if (arr[0] < arr[1]){
//         let small= arr[0];
//         console.log(small);
//     } else { 
//         let small = arr[1];
//     }
//     console.log(small);
//     return arr;
// }
// 
// smallestCommons([3,5]);

    function findLength(str){return str.length;} 
     
    var lengths = ["cat", "it", "banana", "fish", "do", "dodo"].map(findLength);
  console.log(lengths); // [3, 2, 6, 4, 2, 4]
