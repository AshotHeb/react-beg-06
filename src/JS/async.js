
//order in async actions   => callback

function sayHello(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Hello ${name}`);
            // callback && callback();
            // !callback && console.log("End");
            resolve();
        }, 1000);
    })
};

//async await
(async function () {
    await sayHello("Narek");
    await sayHello("Ashot");
    await sayHello("Hrach");
    await sayHello("Tatev");
    console.log("End");

})()




// sayHello("Ashot")
//     .then(() => sayHello("Narek"))
//     .then(() => sayHello("Karen"))
//     .catch(error => {
//         console.log("Promise Error", error);
//     })

//callback
// sayHello("Ashot", () => {
//     sayHello("Hrach", () => {
//         sayHello("Amalya", () => {
//             sayHello("Narek", () => {
//                 sayHello("Karen");
//             });
//         });
//     });
// });


// const p1 = new Promise((resolve, reject) => {
//     if (Math.random() * 10 > 5) {
//         resolve("ok");
//     } else {
//         reject("chok");
//     }
// })
//     .then(result => {
//         console.log("result", result);
//         if (true)
//             throw new Error("Inchvor Errror");
//         return 2;
//     })
//     .then(data => {
//         console.log("second then", data);
//         return 3;
//     })
//     .then(data => {
//         console.log("third then", data);
//         return "End";
//     })
//     .then(data => {
//         console.log("fourth then", data);

//     })
//     .catch(error => {
//         console.log("Error = >", error);
//     })


// const p = new Promise((resolve, reject) => {
//     sayHello("Ashot", resolve);
// }).then(() => {
//     return new Promise((resolve, reject) => {
//         sayHello("Narek", resolve);
//     })
//         .then(() => {
//             return new Promise((resolve, reject) => {
//                 sayHello("Karen", resolve);
//             })
//                 .then(() => {
//                     console.log("End");
//                 })
//         })

// })



    // fetch("url")
    // .then(res=>res.json())
    // .then(data=>)


