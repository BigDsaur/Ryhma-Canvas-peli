export default class Health {
    draw(ctx) {
        const hpbar = new Image()
        const currenthp = localStorage.getItem("currenthp")
        const fullhp = localStorage.getItem("fullhp")     
        const percentagehp = (100 * (currenthp / fullhp)).toFixed(0)

        console.log(percentagehp);

        if ( percentagehp == 100){
            hpbar.src = "./art/hp/hp100.png"
        } else if (percentagehp >= 90 && percentagehp < 100) {
            hpbar.src = "./art/hp/hp90.png"
        } else if (percentagehp >= 80 && percentagehp < 90) {
            hpbar.src = "./art/hp/hp80.png"
        } else if (percentagehp >= 70 && percentagehp < 80) {
            hpbar.src = "./art/hp/hp70.png"
        } else if (percentagehp >= 60 && percentagehp < 70) {
            hpbar.src = "./art/hp/hp60.png"
        } else if (percentagehp >= 50 && percentagehp < 60) {
            hpbar.src = "./art/hp/hp50.png"
        } else if (percentagehp >= 40 && percentagehp < 50) {
            hpbar.src = "./art/hp/hp40.png"
        } else if (percentagehp >= 30 && percentagehp < 40) {
            hpbar.src = "./art/hp/hp30.png"
        } else if (percentagehp >= 20 && percentagehp < 30) {
            hpbar.src = "./art/hp/hp20.png"
        } else if (percentagehp >= 10 && percentagehp < 20) {
            hpbar.src = "./art/hp/hp10.png"
        } else if (percentagehp < 10) {
            hpbar.src = "./art/hp/hp5.png"
        }
        
        ctx.drawImage(hpbar, 20, 50, 200, 40)
    }
}