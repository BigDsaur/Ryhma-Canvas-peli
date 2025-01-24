import Player from "./player.js"
import pointsToScreen from "./points.js";
import Enemy from "./enemy.js"
import BulletController from "./bulletcontroller.js";
import Projectile from "./projectile.js";
import background from "./background.js";


const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const movingbackground = new background(canvas)

let totalPoints = 5000
canvas.width = 800
canvas.height = 800

const playerBulletController = new BulletController(canvas, 15, "./art/playerBullet.png", true, 16);
const enemyBulletController = new BulletController(canvas, 16, "./art/bullet.png", true, 32);
const enemyBulletController2 = new BulletController(canvas, 1, "./art/bullet.png", true, 24);
const enemyBulletController3 = new BulletController(canvas, 8, "./art/bullet.png", true, 64);

const projectiles = [];

canvas.addEventListener("click", (event) => {
    console.log("Mouse clicked, firing projectile");
    projectiles.push(player.shoot(event, canvas));
});


const player = new Player(canvas, 8, playerBulletController)
const enemy = new Enemy(canvas, 3.45, enemyBulletController, enemyBulletController2, enemyBulletController3)

function game() {
    movingbackground.draw(ctx)
    player.draw(ctx)
    enemy.draw(ctx)
    playerBulletController.draw(ctx)
    enemyBulletController.draw(ctx)
    enemyBulletController2.draw(ctx)
    enemyBulletController3.draw(ctx)

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