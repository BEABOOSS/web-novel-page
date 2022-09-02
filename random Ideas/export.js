const ump = require("./export-manga-BEABOOSS.json");



// for(let i =0; i < arr.length ; i++){
//     let x = user.entries[i].name
//     console.log(x)
// };


const displayImg = () => {
    let x = ump.entries
    x.forEach(el => {
        console.log("Name: ", el.name,"||" ,"Chapter: ", el.ch,"||", "Status: ", el.status );
    });
};

// displayImg();

const genre = require("../seeds/genres");
