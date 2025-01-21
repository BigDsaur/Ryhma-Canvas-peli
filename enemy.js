export default class Enemy {
    constructor(canvas, velocity) {
        this.canvas = canvas;
        this.velocity = velocity
        this.tempVelocity = velocity

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 8;
        this.width = 128;
        this.height = 128;
    
        this.image = new Image();
        this.image.src = `enemy.png`;
    }
  
    draw(ctx) {
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    move() {
        this.x += this.velocity;
    }
  
    collideWithWalls() {
        //left
        if (this.x < 0) {
            this.velocity = this.tempVelocity;
        }
    
        //right
        if (this.x > this.canvas.width - this.width) {
            this.velocity += -(this.tempVelocity * 2);
      }
  }
}
