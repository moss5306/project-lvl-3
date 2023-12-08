console.log("Hallo nodeJS");
const os = require("os");
let message = "Die Plattform ist ";

function main() {
    console.log(message + os.platform());
}
main();


const Square = require("./module.js")
let mySquareObject = new Square (5)

function main(){
    console.log(mySquareObject.getArea())
}
main;