export default class background {
    constructor (canvas) {
        this.canvas = canvas
        this.image = new Image();
        this.image.src = "./art/space.png";
        this.width = 800;
        this.height = 800;
        this.speedY = 1;
        this.x = 0;
        this.y = 0;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height);           
        this.y += this.speedY;
        if (this.y >= this.height) {
            this.y = 0;
        }
    }
}