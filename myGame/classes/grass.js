const LivingCreature = require("./livingcreature.js")
module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.colorValue = 1

    }
    mul() {
        this.roundCount++
        // console.log(this.roundCount)
        if (this.roundCount >= 6) {
            let emptyFields = this.findFields(0)
            if (emptyFields.length > 0) {
                //console.log(emptyFields)
                let randomIndex = Math.floor(Math.random() * emptyFields.length)
                let newPos = emptyFields[randomIndex]
                let newX = newPos[0]
                let newY = newPos[1]

                grassArr.push(new Grass(newX, newY))
                matrix[newY][newX] = 1
            }

            this.roundCount = 0
        }

    }
}
