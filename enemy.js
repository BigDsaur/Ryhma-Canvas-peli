export default class Enemy {
    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.tempVelocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 8;
        this.width = 128;
        this.height = 128;
        this.health = 5;
    
        this.image = new Image();
        this.image.src = "enemy.png";
    }

    takeDamage() {
        this.health -= 1;
        console.log(`Enemy hit! Health: ${this.health}`);
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

    // yhdistin colliden ja liikumisen
    move() {
        this.x += this.velocity;

        if (this.x <= 0 || this.x + this.width >= this.canvas.width) {
            this.velocity *= -1;
        }
    }

    draw(ctx) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, -4, 10);
        this.move();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
