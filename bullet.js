export default class Bullet {
    constructor(canvas, x, y, velocity, bulletImage, bulletHeight, bulletWidth) {
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      
      this.image = new Image()
      this.image.src = bulletImage
      this.bulletImage = this.image  
      
      this.width = bulletWidth;
      this.height = bulletHeight;
    }
  
    draw(ctx) {
      this.y -= this.velocity;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
  
    collideWith(sprite) {
      if (
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
