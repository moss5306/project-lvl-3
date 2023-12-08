module.exports = class LivingCreature {
    constructor(x, y,) {
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
}
