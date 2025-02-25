import Background from "./background.js";
import Button from "./levels.js"

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 800
const levels = 3
const title = new Image()
title.src = "./art/spaceshooter.png"

const buttons = {};
const movingbackground = new Background(canvas)

function game() {
    movingbackground.draw(ctx);
    ctx.drawImage(title, 150, 100, 500, 100)

    for (let i = 1; i <= levels; i++) {
        buttons[`button${i}`] = new Button(i, `${i}00`, 300, 64, 64);
        buttons[`button${i}`].draw(ctx);
    }
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    for (let i = 1; i <= levels; i++) {
        if (buttons[`button${i}`].isClicked(mouseX, mouseY)) {
            switch(i) {
                case 1:
                    localStorage.setItem("selectedEnemy", "dentonator")              
                    break;
                case 2:
                    localStorage.setItem("selectedEnemy", "tank")
                    break;
                case 3:
                    localStorage.setItem("selectedEnemy", "warper")
                    break;
            }
            buttons[`button${i}`].onClick();
        }
    }
});

setInterval(game, 1000 / 60);