import Player from "./player.js"
import pointsToScreen from "./points.js";
import Enemy from "./enemy.js"
import BulletController from "./bulletcontroller.js";
import Projectile from "./projectile.js";

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const background = new component()

let totalPoints = 5000
canvas.width = 800
canvas.height = 800

function component() {
    this.image = new Image();
    this.image.src = "./space.png";
    this.width = 800;
    this.height = 800;
    this.speedY = 1;
    this.x = 0;
    this.y = 0;

    this.update = function() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height);           
        this.y += this.speedY;
        if (this.y >= this.height) {
            this.y = 0;
        }  
    }
}

const playerBulletController = new BulletController(canvas, 15, "playerBullet.png", true, 16);
const enemyBulletController = new BulletController(canvas, 5, "bullet.png", true, 32);
const projectiles = [];

canvas.addEventListener("click", (event) => {
    console.log("Mouse clicked, firing projectile");
    projectiles.push(player.shoot(event, canvas));
});


const player = new Player(canvas, 8, playerBulletController)
const enemy = new Enemy(canvas, 2, enemyBulletController)

function game() {
    background.update()
    player.draw(ctx)
    enemy.draw(ctx)
    playerBulletController.draw(ctx)
    enemyBulletController.draw(ctx)

    pointsToScreen(totalPoints);

    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        projectiles[i].draw(ctx);

        // Check collision with enemy
        if (enemy.isHit(projectiles[i])) {
            enemy.takeDamage();
            projectiles.splice(i, 1);
        } else if (projectiles[i].outOfBounds(canvas)) {
            projectiles.splice(i, 1);
        }
    }

}

setInterval(game, 1000 / 60)
