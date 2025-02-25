import Projectile from "./projectile.js";
import Button from "./levels.js";

export default class Player {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;
  
  constructor(canvas, velocity, bulletController) {
      this.canvas = canvas;
      this.velocity = velocity;
      this.bulletController = bulletController;

      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - 75;
      this.width = 50;
      this.height = 46;
      this.health = 1000;
      this.image = new Image();
      this.image.src = "./art/player.png";

      document.addEventListener("keydown", (event) => this.keydown(event));
      document.addEventListener("keyup", (event) => this.keyup(event));
  }

    takeDamage() {
        this.health -= 1;
        console.log(`player hit! Health: ${this.health}`);
    }

    isHit(enemyBulletControllers) {
        for (let controller of enemyBulletControllers) {
            if (controller.collideWith(this)) {
                console.log("Player hit by enemy bullet!");
                return true; 
            }
        }
        return false; 
    }
        

  draw(ctx) {
      if (this.shootPressed) {
          this.bulletController.shoot(this.x + this.width / 2, this.y, 6, 10);
      }
      this.move();
      this.collideWithWalls();
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWithWalls() {
      if (this.x < 42) {
          this.x = 42;
      }
      if (this.x > this.canvas.width -42 - this.width) {
          this.x = this.canvas.width -42 - this.width;
      }
  }

  move() {
      if (this.rightPressed) {
          this.x += this.velocity;
      } 
      if (this.leftPressed) {
          this.x -= this.velocity;
      }
  }

  keydown(event) {
      if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.rightPressed = true;
          console.log("Moved right");
      }
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.leftPressed = true;
          console.log("Moved left");
      }
      if (event.code === "Space") {
          this.shootPressed = true;
          console.log("Shoot");
      }
  }

  keyup(event) {
      if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.rightPressed = false;
      }
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.leftPressed = false;
      }
      if (event.code === "Space") {
          this.shootPressed = false;
      }
  }

  shoot(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    return new Projectile(this.x + this.width / 2 - 2.5, this.y, mouseX, mouseY);
}

}

