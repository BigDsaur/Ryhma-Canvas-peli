export default class Enemy {
    constructor(canvas, velocity, bulletController, bulletController2, bulletController3, bulletController4) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.tempVelocity = velocity;
        this.bulletController = bulletController;
        this.bulletController2 = bulletController2;
        this.bulletController3 = bulletController3;
        this.bulletController4 = bulletController4;
        

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 8;
        this.width = 128;
        this.height = 128;
        this.health = 50;
        localStorage.setItem("fullhp", this.health)
        localStorage.setItem("currenthp", this.health)  
    
        this.image = new Image();
        this.image.src = "./art/dentonator.png";
    }

    takeDamage(amount) {
        this.health -= amount;
        localStorage.setItem("currenthp", this.health)
    }

    isHit(projectile) {
        return (
            this.health > 0 &&
            projectile.x < this.x + this.width &&
            projectile.x + projectile.width > this.x &&
            projectile.y < this.y + this.height &&
            projectile.y + projectile.height > this.y
        );
    }

    move() {
        this.x += this.velocity;

        if (this.x <= 0 || this.x + this.width >= this.canvas.width) {
            this.velocity *= -1;
        }
    }

    draw(ctx, enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4) {
        this.bulletController.shoot(this.x + this.width / 2, this.y + 100, -4, 6.5);
        this.bulletController2.shoot(this.x + this.width / 2, this.y + 100, -1.9, 3.25);
        this.bulletController3.shoot(this.x + this.width / 2 - 25, this.y + 100, -10, 3);
        this.bulletController4.shoot(this.x + this.width / 2 + 25, this.y + 100, -10, 3);
        this.move();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        enemyBulletController.draw(ctx)
        enemyBulletController2.draw(ctx)
        enemyBulletController3.draw(ctx)
        enemyBulletController4.draw(ctx)
    }
}
