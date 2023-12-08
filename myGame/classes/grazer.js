const LivingCreature = require("./livingcreature.js")
module.exports = class Grazer extends LivingCreature {
    constructor(x, y) {
super(x, y)
      
        this.eatCount = 0;
      
        this.notEatCount = 0
        this.colorVal = 2;
       
    }

    findFields(character) {
        this.updateDirections()
return super.findFields(character)
        
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
let randomIndex = Math.floor(Math.random() * emptyFields.length)
            let pos = emptyFields[randomIndex]
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
            let randomIndex = Math.floor(Math.random() * mushFields.length)
            let pos = mushFields[randomIndex]
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
            let randomIndex = Math.floor(Math.random() * grassFields.length)
            let pos = grassFields[randomIndex]
            let newX = pos[0];
            let newY = pos[1];
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
            let randomIndex = Math.floor(Math.random() * emptyFields.length)
            let newPos = emptyFields[randomIndex]
            let newX = newPos[0]
            let newY = newPos[1]

            grazerArr.push(new Grazer(newX, newY))
            matrix[newY][newX] = this.colorVal
        }
    }


}