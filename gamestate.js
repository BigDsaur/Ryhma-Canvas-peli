import Player from "./player.js"
import pointsToScreen from "./points.js";
import BulletController from "./bulletcontroller.js";
import Projectile from "./projectile.js";
import Background from "./background.js";

import Dentonator from "./enemies/dentonator.js"
import Warper from "./enemies/warper.js"

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const movingbackground = new Background(canvas)

let totalPoints = 5000
canvas.width = 800
canvas.height = 800

const playerBulletController = new BulletController(canvas, 15, "./art/playerBullet.png", true, 16);
const player = new Player(canvas, 8, playerBulletController)

const projectiles = [];

canvas.addEventListener("click", (event) => {
    console.log("Mouse clicked, firing projectile");
    projectiles.push(player.shoot(event, canvas));
});

const selectedEnemy = localStorage.getItem("selectedEnemy")
console.log(selectedEnemy);

if (selectedEnemy === "dentonator") {
    var enemyBulletController = new BulletController(canvas, 16, "./art/dentonatorbullet.png", true, 32);
    var enemyBulletController2 = new BulletController(canvas, 1, "./art/dentonatorbullet.png", true, 64);
    var enemyBulletController3 = new BulletController(canvas, 1, "./art/dentonatorbullet.png", true, 16);
    var enemyBulletController4 = new BulletController(canvas, 1, "./art/dentonatorbullet.png", true, 16);
    var enemy = new Dentonator(canvas, 3.45, enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4)
} else if (selectedEnemy === "warper") {
    var enemyBulletController = new BulletController(canvas, 16, "./art/warperbullet.png", true, 32);
    var enemyBulletController2 = new BulletController(canvas, 1, "./art/warperbullet.png", true, 64);
    var enemyBulletController3 = new BulletController(canvas, 1, "./art/warperbullet.png", true, 16);
    var enemyBulletController4 = new BulletController(canvas, 1, "./art/warperbullet.png", true, 16);
    var enemy = new Warper(canvas, 3.45, enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4)
}


function game() {
    movingbackground.draw(ctx)
    player.draw(ctx)
    enemy.draw(ctx, enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4)
    playerBulletController.draw(ctx)
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