import Player from "./player.js"

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 800

// Jos halutan tehä canvasin tausta jollain kuvalla
// const background = new Image()
// background.src = "images/space.png"

function game() {
    // ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    Player.draw(ctx)
}

setInterval(game, 1000 / 60)