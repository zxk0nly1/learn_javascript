import { fchown } from "fs";

// 1. Promise有3个方法，成功，失败，待定。 resolve成功，reject失败，pending待定，异步请求完成后调用.then方法
// 2. .then()里有两个方法，第一个方法执行resolve，第二个执行reject
// 3. resolve成功被执行.then里的resolve，reject就执行.then里的reject
// 4. .then()可以拿到resolve(arr),reject(err)异步失败，传递过来的数据

// let p=new Promise(function(resolve,reject){
//     // 异步代码
//     // resolve--异步请求成功了，请resolve执行.then()里的第一个方法
//     // reject --异步请求失败了，请reject执行.then()里的第二个方法
// });

// p.then(()=>{},()=>{});

// let p = new Promise(function(resolve, reject) {
//     $.ajax({
//         url = 'arr.txt',
//         dataType: 'json',
//         success(arr) {
//             resolve(arr);
//         },
//         error(err) {
//             reject(err)
//         }
//     })
// });

// p.then(arr => {
//     console.log('成功' + arr);
// }, err => {
//     console.log('失败' + err);
// });

function bar() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    });
}

bar.then(() => {
    console.log('xiashan')
})