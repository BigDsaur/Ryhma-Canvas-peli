import Player from "./player.js"
import Points from "./points.js";
import BulletController from "./bulletcontroller.js";
import Health from "./health.js"
import Background from "./background.js";
import Dentonator from "./enemies/dentonator.js"
import Warper from "./enemies/warper.js"
import Button from "./levels.js";

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const movingbackground = new Background(canvas)
const showhp = new Health(canvas)

let playeralive = true

const defeatbutton = new Button("defeat", 75, 525, 550, 200)
const victorybutton = new Button("victory", 75, 525, 550, 200)

const points = new Points();
canvas.width = 800
canvas.height = 800

const playerBulletController = new BulletController(canvas, 1, "./art/playerBullet.png", true, 40);
const player = new Player(canvas, 8, playerBulletController)

const projectiles = [];

canvas.addEventListener("click", (event) => {
    console.log("Mouse clicked, firing projectile");
    projectiles.push(player.shoot(event, canvas));
});

const selectedEnemy = localStorage.getItem("selectedEnemy")
console.log(selectedEnemy);

if (selectedEnemy === "dentonator") {
    var enemyBulletController = new BulletController(canvas, 16, "./art/dentonatorbullet.png", false, 32);
    var enemyBulletController2 = new BulletController(canvas, 1, "./art/dentonatorbullet.png", false, 64);
    var enemyBulletController3 = new BulletController(canvas, 1, "./art/dentonatorbullet.png", false, 16);
    var enemyBulletController4 = new BulletController(canvas, 1, "./art/dentonatorbullet.png", false, 16);
    var enemyBulletControllers = [enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4];
    var enemy = new Dentonator(canvas, 3.45, enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4)
} else if (selectedEnemy === "warper") {
    var enemyBulletController = new BulletController(canvas, 16, "./art/warperbullet.png", false, 32);
    var enemyBulletController2 = new BulletController(canvas, 1, "./art/warperbullet.png", false, 64);
    var enemyBulletController3 = new BulletController(canvas, 1, "./art/warperbullet.png", false, 16);
    var enemyBulletController4 = new BulletController(canvas, 1, "./art/warperbullet.png", false, 16);
    var enemyBulletControllers = [enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4];
    var enemy = new Warper(canvas, 3.45, enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4)
}


function game() {
    movingbackground.draw(ctx)
    points.draw(ctx)
    showhp.draw(ctx)
    
    if (localStorage.getItem("currenthp") > 0) {
        enemy.draw(ctx, enemyBulletController, enemyBulletController2, enemyBulletController3, enemyBulletController4)
    } else if (localStorage.getItem("currenthp") == 0) {       
        victorybutton.draw(ctx)
    }

    if (playeralive == true) {
     
        playerBulletController.checkBulletCollisions(enemyBulletController);
        playerBulletController.checkBulletCollisions(enemyBulletController2);
        playerBulletController.checkBulletCollisions(enemyBulletController3);
        playerBulletController.checkBulletCollisions(enemyBulletController4);
        if (playerBulletController.collideWith(enemy)) {
            enemy.takeDamage(5);
            points.addPoints(50);
    }
        playerBulletController.draw(ctx)
        player.draw(ctx)

        if (player.isHit(enemyBulletControllers) && localStorage.getItem("currenthp") > 0) {
            player.takeDamage(ctx);
            playeralive = false 
        }

        for (let i = projectiles.length - 1; i >= 0; i--) {
            projectiles[i].update();
            projectiles[i].draw(ctx);

            // Check collision with enemy
            if (enemy.isHit(projectiles[i])) {
                enemy.takeDamage(1);
                points.addPoints(10);
                projectiles.splice(i, 1);
            } else if (projectiles[i].outOfBounds(canvas)) {
                projectiles.splice(i, 1);
            }
        }
        
    } else if (playeralive == false) {      
        defeatbutton.draw(ctx);
    }


    
}
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (defeatbutton.isClicked(mouseX, mouseY) && playeralive == false) {
        defeatbutton.onClick(playeralive);
    }
});


setInterval(game, 1000 / 60)