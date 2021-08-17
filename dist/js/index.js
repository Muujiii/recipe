"use strict";

var arr = [1, 2, 3, 4, 5, 6];

var myfunc = function myfunc(a) {
  console.log("Too :  ".concat(a));
};

var arr2 = [].concat(arr, [44, 123]);
myfunc(arr2[6]);