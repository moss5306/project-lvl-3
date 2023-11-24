let grazerArr = []
let grassArr = []
let predatorArr = []
let supereaterArr = []
let mushroomArr = []
function getRandomMatrix(width, height) {
    

    let matrix = []


    for (let y = 0; y < height; y++) {

        matrix.push([])


        for (let x = 0; x < width; x++) {
            matrix[y][x] = Math.floor(Math.random() * 2)
            //if (y + x <= 7) { matrix[y][x] = 1 }
            //else { matrix[y][x] = 0 }
        }
    }
    return matrix;
}

function moreLive() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (y == x) {
                matrix[y][x] = 2
            }

            if (x + y == matrix.length - 1) {

                matrix[y][x] = 5
            }
          if (x + y == matrix.length -6) {
           matrix[y][x] = 3
          }
        } 
    } 
   matrix [16][16] = 2
    matrix[15][15] = 4 
}

function setup() {

    matrix = getRandomMatrix(30, 30)
    moreLive()
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1)
    background("#acacac")
    frameRate(fr)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y))
            }
            else if (matrix[y][x] == 2) {
                grazerArr.push(new Grazer(x, y))

            }
            else if (matrix[y][x] == 3) {
                predatorArr.push(new Predator(x, y))

            }
            else if (matrix[y][x] == 4) {
                supereaterArr.push(new Supereater(x, y))

            }
            else if (matrix[y][x] == 5) {
                mushroomArr.push(new Mushroom(x, y))
            }
        }
    }
    //console.log(grassArr)
}


function draw() {
    //console.log(grassObj)
    for (let i = 0; i < grassArr.length; i++) {
        let g = grassArr[i];
        g.mul()


    }

    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i]
        grazerObj.eat()

    }
    for (let i = 0; i < predatorArr.length; i++) {
        let predatorObj = predatorArr[i];
        predatorObj.eat()
    }
    for (let i = 0; i < supereaterArr.length; i++) {
        let superEaterObj = supereaterArr[i];
        superEaterObj.eat()
    }
    for (let i = 0; i < mushroomArr.length; i++) {
        let mushObj = mushroomArr[i];
        mushObj.mul()
    
}
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
let side = 20
let fr = 2

let matrix = [
    [0, 0, 1, 0, 0],
    [1, 2, 0, 3, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 4, 0, 0],
    [1, 2, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];






// //let matrix = [
//     [0, 1, 0, 2, 2, 0, 0, 0],
//     [0, 3, 0, 1, 1, 0, 0, 0],
//     [0, 2, 0, 1, 0, 0, 1, 3],
//     [0, 0, 1, 2, 2, 0, 2, 2],
//     [0, 0, 1, 0, 0, 0, 2, 0],
//     [0, 0, 3, 0, 1, 1, 0, 0]
// ];
