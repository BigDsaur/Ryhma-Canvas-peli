export default class Enemy {
    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.tempVelocity = velocity;
        this.initialVelocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 8;
        this.width = 128;
        this.height = 128;
        this.health = 100;
        localStorage.setItem("fullhp", this.health)
        localStorage.setItem("currenthp", this.health)  

        this.image = new Image();
        this.image.src = "./art/tank.png";
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
    
        this.velocity *= 1.001;
        this.velocity = Math.min(this.velocity, 6);

        if (Math.abs(this.velocity) >= 6) {
            this.velocity = this.initialVelocity * Math.sign(this.velocity);
        }
    }

    draw(ctx, enemyBulletController) {
        this.bulletController.shoot(this.x + this.width / 2, this.y + 100, -8, 6.5);
        this.move();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        enemyBulletController.draw(ctx)
    }
}
