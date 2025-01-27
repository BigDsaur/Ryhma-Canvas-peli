export default class Button {
    constructor (number, x, y) {
        this.x = Number(x*1.8);
        this.y = y;
        this.width = 64;
        this.height = 64;
    
        this.image = new Image();
        this.image.src = `./art/n${number}.png`;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height;
    }
    onClick() {
        if (!this.clicked) {
            window.location.replace("./gamestate.html");
        }
    }
}