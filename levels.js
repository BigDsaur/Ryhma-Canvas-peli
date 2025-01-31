export default class Button {
    constructor (number, x, y, width, height) {
        this.x = Number(x*1.8);
        this.y = y;
        this.width = width;
        this.height = height;
    
        this.image = new Image();
        this.image.src = `./art/${number}.png`;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height;
    }
    onClick(playeralive) {
        if (playeralive == false) {
            window.location.replace("./index.html");
        } else if (!this.clicked) {
            window.location.replace("./gamestate.html");
        }
    }
}