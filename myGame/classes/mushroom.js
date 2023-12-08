const LivingCreature = require("./livingcreature.js")

module.exports = 
class Mushroom extends LivingCreature {
    constructor(x, y) {
        super(x,y)
                this.x = x;
                this.y = y;
    }
    
    
    mul() {
        this.roundCount++
        // console.log(this.roundCount)
        if (this.roundCount >= 10) {
            let emptyFields = this.findFields(0)
            if (emptyFields.length > 0) {
                //console.log(emptyFields)
                let randomIndex = Math.floor(Math.random() * emptyFields.length)
                let newPos = emptyFields[randomIndex]
                let newX = newPos[0]
                let newY = newPos[1]

                mushroomArr.push(new Mushroom(newX, newY))
                matrix[newY][newX] = 5
            }


            this.roundCount = 0
        }


    }
}