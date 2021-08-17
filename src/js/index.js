const arr = [1,2,3,4,5,6];

let myfunc = a => {
    console.log(`Too :  ${a}`);
}

const arr2 = [...arr, 44, 123];

myfunc(arr2[6]);