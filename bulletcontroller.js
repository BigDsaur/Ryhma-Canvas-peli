import Bullet from "./bullet.js";

export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;

  constructor(canvas, maxBulletsAtATime, bulletImage, isPlayer, bulletWidth, bulletHeight) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletImage = bulletImage;
    this.bulletWidth = bulletWidth
    this.bulletHeight = bulletHeight
    this.isPlayer = isPlayer;
  }
  
  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTillNextBulletAllowed > 0) {
      this.timeTillNextBulletAllowed--;
    }
  }

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }

    return false;
  }

  shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) {    
      const bullet = new Bullet(this.canvas, x - 20, y, velocity, this.bulletImage, this.bulletWidth, this.bulletHeight);
      this.bullets.push(bullet);
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
  
  checkBulletCollisions(enemyBulletController) {
    this.bullets.forEach((playerBullet, playerIndex) => {
        if (!this.isPlayer) return; // ✅ Only player bullets should check for enemy bullets

        enemyBulletController.bullets.forEach((enemyBullet, enemyIndex) => {
            if (
                playerBullet.x < enemyBullet.x + enemyBullet.width &&
                playerBullet.x + playerBullet.width > enemyBullet.x &&
                playerBullet.y < enemyBullet.y + enemyBullet.height &&
                playerBullet.y + playerBullet.height > enemyBullet.y
            ) {
                console.log("💥 Bullet Collision! Player bullet hit enemy bullet!");
                enemyBulletController.bullets.splice(enemyIndex, 1);
            }
        });
    });
  }
}
