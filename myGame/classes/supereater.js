module.exports = 
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
            let randomIndex = Math.floor(Math.random() * emptyFields.length)
            let pos = emptyFields[randomIndex]
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
            let randomIndex = Math.floor(Math.random() * grazerFields.length)
            let pos = grazerFields[randomIndex]
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
            let randomIndex = Math.floor(Math.random() * grassFields.length)
            let pos = grassFields[randomIndex]
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
            let randomIndex = Math.floor(Math.random() * emptyFields.length)

            let newPos = emptyFields[randomIndex]
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