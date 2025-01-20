import Player from "./player.js"
import pointsToScreen from "./points.js";

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let totalPoints = 5000
canvas.width = 800
canvas.height = 800

const background = new Image()
background.src = "space.png"

const player = new Player(canvas, 12)

function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    player.draw(ctx)
    pointsToScreen(totalPoints);
}

setInterval(game, 1000 / 60)
