class Grass {
    constructor(x, y) {
        this.colorValue = 1
        this.x = x
        this.y = y
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
        this.roundCount = 0
    }
    findFields(symbol) {
        let found = []
        for (let i = 0; i < this.neighbours.length; i++) {
            const pos = this.neighbours[i];
            let posX = pos[0]
            let posY = pos[1]
            if (posX >= 0 && posX < matrix[0].length &&
                posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] == symbol) {
                    found.push(pos)
                }

            }
        }
        return found
    }
    mul() {
        this.roundCount++
        // console.log(this.roundCount)
        if (this.roundCount >= 6) {
            let emptyFields = this.findFields(0)
            if (emptyFields.length > 0) {
                //console.log(emptyFields)
                let newPos = random(emptyFields)
                let newX = newPos[0]
                let newY = newPos[1]

                grassArr.push(new Grass(newX, newY))
                matrix[newY][newX] = 1
            }

            this.roundCount = 0
        }

    }
}

class Grazer {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        //rundenzähler
        this.eatCount = 0;
        //farbe 
        this.notEatCount = 0
        this.colorVal = 2;
        // sicht Nachbar feld
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findFields(character) {
        this.updateDirections()

        let found = []
        //durchlaufen der nachbarfelder
        for (let i = 0; i < this.neighbours.length; i++) {
            let posArr = this.neighbours[i];//[x,y]
            let x = posArr[0];
            let y = posArr[1];
            //schaue in der spielwelt nach ob da eine null steht

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    //nachbarfeld ist leer
                    found.push(posArr);
                }
            }
        }
        return found;
    }
    updateDirections() {
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {

        let emptyFields = this.findFields(0)

        if (emptyFields.length > 0) {

            let pos = random(emptyFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = this.colorVal;
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;
        }



    }



    eat() {
        let mushFields = this.findFields(5)

        let grassFields = this.findFields(1)



        if (mushFields.length > 0) {
            let pos = random(mushFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = this.colorVal
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < mushroomArr.length; i++) {
                const mushroomObj = mushroomArr[i];
                if (mushroomObj.x == newX && mushroomObj.y == newY) {
                    mushroomArr.splice(i, 1);
                    this.die()
                }
            }
        }

        else if (grassFields.length > 0) {
            let pos = random(grassFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = this.colorVal
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < grassArr.length; i++) {
                const grassObj = grassArr[i];
                if (grassObj.x == newX && grassObj.y == newY) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.eatCount++
            this.notEatCount = 0

            if (this.eatCount > 6) {
                this.mult()
                this.eatCount = 0
            }


        } else {
            this.notEatCount++
            this.eatCount = 0
            if (this.notEatCount > 3) {
                this.die()
            }
            else {
                this.move()
            }

        }



    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i = 0; i < grazerArr.length; i++) {
            const me = grazerArr[i];
            if (this.x == me.x && this.y == me.y) {
                grazerArr.splice(i, 1)
                break
            }
        }

    }


    mult() {
        let emptyFields = this.findFields(0)
        if (emptyFields.length > 0) {
            //console.log(emptyFields)
            let newPos = random(emptyFields)
            let newX = newPos[0]
            let newY = newPos[1]

            grazerArr.push(new Grazer(newX, newY))
            matrix[newY][newX] = this.colorVal
        }
    }


}

class Predator {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        //rundenzähler
        this.eatCount = 0;
        //farbe 
        this.notEatCount = 0
        this.colorVal = 3;
        // sicht Nachbar feld
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findFields(character) {
        this.updateDirections()

        let found = []
        //durchlaufen der nachbarfelder
        for (let i = 0; i < this.neighbours.length; i++) {
            let posArr = this.neighbours[i];//[x,y]
            let x = posArr[0];
            let y = posArr[1];
            //schaue in der spielwelt nach ob da eine null steht

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    //nachbarfeld ist leer
                    found.push(posArr);
                }
            }
        }
        return found;
    }
    updateDirections() {
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {

        let emptyFields = this.findFields(0)

        if (emptyFields.length > 0) {

            let pos = random(emptyFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;
        }



    }

    eat() {
        let mushFields = this.findFields(5)
        let grazerFields = this.findFields(2)



        if (mushFields.length > 0) {
            let pos = random(mushFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = this.colorVal
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < mushroomArr.length; i++) {
                const mushroomObj = mushroomArr[i];
                if (mushroomObj.x == newX && mushroomObj.y == newY) {
                    mushroomArr.splice(i, 1);
                    this.die()
                }
            }
        }



        else if (grazerFields.length > 0) {
            let pos = random(grazerFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = this.colorVal
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x == newX && grazerObj.y == newY) {

                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.eatCount++
            this.notEatCount = 0

            if (this.eatCount > 8) {
                this.mult()
                this.eatCount = 0
            }


        } else {
            this.notEatCount++
            this.eatCount = 0
            if (this.notEatCount > 9) {
                this.die()
            }
            else {
                this.move()
            }

        }



    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i = 0; i < predatorArr.length; i++) {
            const me = predatorArr[i];
            if (this.x == me.x && this.y == me.y) {
                predatorArr.splice(i, 1)
                break
            }
        }

    }


    mult() {
        let emptyFields = this.findFields(0)
        if (emptyFields.length > 0) {
            //console.log(emptyFields)
            let newPos = random(emptyFields)
            let newX = newPos[0]
            let newY = newPos[1]

            predatorArr.push(new Predator(newX, newY))
            matrix[newY][newX] = this.colorVal
        }
    }

}

class Supereater {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        //rundenzähler
        this.eatCount = 0;
        //farbe 
        this.notEatCount = 0
        this.colorVal = 4;
        // sicht Nachbar feld
        this.neighbours = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    findFields(character) {
        this.updateDirections()

        let found = []
        //durchlaufen der nachbarfelder
        for (let i = 0; i < this.neighbours.length; i++) {
            let posArr = this.neighbours[i];//[x,y]
            let x = posArr[0];
            let y = posArr[1];
            //schaue in der spielwelt nach ob da eine null steht

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    //nachbarfeld ist leer
                    found.push(posArr);
                }
            }
        }
        return found;
    }
    updateDirections() {
        this.neighbours = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    move() {

        let emptyFields = this.findFields(0)

        if (emptyFields.length > 0) {

            let pos = random(emptyFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;
        }

    }
    eat() {
        let grazerFields = this.findFields(2)
        let grassFields = this.findFields(1)
        // let mushFields = this.findFields(5)
        // if (mushFields.length > 0) {
        //     let pos = random(mushFields);
        //     let newX = pos[0];
        //     let newY = pos[1]
        //     matrix[newY][newX] = this.colorVal
        //     matrix[this.y][this.x] = 0
        //     this.x = newX;
        //     this.y = newY;
        //     mushroomArr
        //     for (let i = 0; i < mushroomArr; i++) {
        //         let mushroomObj = mushroomArr[i];
        //         if (mushroomObj.x == newX && mushroomObj.y == newY) {
        //             mushroomArr.splice(i, 1);
        //             this.die()
        //         }
        //     }
        // }

        if (grazerFields.length > 0) {
            let pos = random(grazerFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = this.colorVal
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x == newX && grazerObj.y == newY) {

                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.eatCount++
            this.notEatCount = 0




        } else if (grassFields.length > 0) {
            let pos = random(grassFields);
            let newX = pos[0];
            let newY = pos[1]
            matrix[newY][newX] = this.colorVal
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < grassArr.length; i++) {
                let grassObj = grassArr[i];
                if (grassObj.x == newX && grassObj.y == newY) {

                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.eatCount++
            this.notEatCount = 0


            if (this.eatCount > 9) {
                this.mult()
                this.eatCount = 0
            }


        }






        else {
            this.notEatCount++
            this.eatCount = 0
            if (this.notEatCount > 5) {
                this.die()
            }
            else {
                this.move()
            }

        }



    }
    mult() {
        let emptyFields = this.findFields(0)
        if (emptyFields.length > 0) {
            //console.log(emptyFields)
            let newPos = random(emptyFields)
            let newX = newPos[0]
            let newY = newPos[1]

            supereaterArr.push(new Supereater(newX, newY))
            matrix[newY][newX] = this.colorVal
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i = 0; i < supereaterArr.length; i++) {
            let me = supereaterArr[i];
            if (this.x == me.x && this.y == me.y) {
                supereaterArr.splice(i, 1)
                break
            }
        }

    }




}


class Mushroom {
    constructor(x, y) {
        this.colorValue = 5
        this.x = x
        this.y = y
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
        this.roundCount = 0
    }
    findFields(symbol) {
        let found = []
        for (let i = 0; i < this.neighbours.length; i++) {
            const pos = this.neighbours[i];
            let posX = pos[0]
            let posY = pos[1]
            if (posX >= 0 && posX < matrix[0].length &&
                posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] == symbol) {
                    found.push(pos)
                }

            }
        }
        return found
    }
    mul() {
        this.roundCount++
        // console.log(this.roundCount)
        if (this.roundCount >= 10) {
            let emptyFields = this.findFields(0)
            if (emptyFields.length > 0) {
                //console.log(emptyFields)
                let newPos = random(emptyFields)
                let newX = newPos[0]
                let newY = newPos[1]

                mushroomArr.push(new Mushroom(newX, newY))
                matrix[newY][newX] = 5
            }


            this.roundCount = 0
        }


    }
}