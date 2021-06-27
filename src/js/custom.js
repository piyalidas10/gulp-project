function sum(...args) {
   let sum = 0;
   for (let arg of args) sum += arg;
   return sum;
 }
 
 let x = sum(11, 12, 13);
 document.getElementById("demo").innerHTML = "Sum of 11+12+13 => "+ x;