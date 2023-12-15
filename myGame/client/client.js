let matrix = []
let side = 10


function setup() {
    createCanvas(500, 500)
}
function draw() {


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) { fill("white") }
            else if (matrix[y][x] == 1) { fill("green") }
            else if (matrix[y][x] == 2) { fill("yellow") }
            else if (matrix[y][x] == 3) { fill("red") }
            else if (matrix[y][x] == 4) { fill("purple") }
            else if (matrix[y][x] == 5) { fill("blue") }
            rect(x * side, y * side, side, side)


        }
    }

}
function main() {
    const socket = io();

    console.log(" ready to display gol...")
    function gotMatrix(data) {
        console.log(data)
        matrix = data
    }
    socket.on("matrix", gotMatrix)
}

window.onload = main;