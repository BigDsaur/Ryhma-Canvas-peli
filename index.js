import Player from "./player.js"
import pointsToScreen from "./points.js";
import Enemy from "./enemy.js"
import BulletController from "./bulletcontroller.js";

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let totalPoints = 5000
canvas.width = 800
canvas.height = 800

const background = new Image()
background.src = "space.png"

const playerBulletController = new BulletController(canvas, 15, "playerBullet.png", true, 16);
const enemyBulletController = new BulletController(canvas, 5, "bullet.png", true, 32);

const player = new Player(canvas, 12, playerBulletController)
const enemy = new Enemy(canvas, 5, enemyBulletController)

function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    player.draw(ctx)
    enemy.draw(ctx)
    playerBulletController.draw(ctx)
    enemyBulletController.draw(ctx)
    pointsToScreen(totalPoints);
}

setInterval(game, 1000 / 60)
