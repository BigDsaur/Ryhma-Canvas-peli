export default class Points{
    constructor() {
        this.points = 0; // Start at 0 points
    }

    addPoints(amount) {
        this.points += amount;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${this.points}`, 10, 30);
    }
}