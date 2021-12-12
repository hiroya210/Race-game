const car1 = document.getElementById("car1")
const car2 = document.getElementById("car2")
const road = document.getElementById("road")
const building = document.getElementById("building")
const finish = document.getElementById("finish")
const wheel1 = document.querySelectorAll(".wheel1")
const wheel2 = document.querySelectorAll(".wheel2")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const winner1 = document.querySelector(".winner")
const startGame = document.querySelector(".start")
const progressBar = document.querySelector("progress")
const progressBar2 = document.querySelector("progress#current-speed2")
const engineBar = document.querySelector("progress#engine")
const engineBar2 = document.querySelector("progress#engine2")
const EngineOverHeat1 = document.querySelector(".overheat.hide")
const EngineOverHeat2 = document.querySelector(".overheat2.hide")
let winnerFlag = true
let canSpeedUp1 = true
let canSpeedUp2 = true
let canSpeedDown1 = true
let canSpeedDown2 = true
let speed1 = 0
let speed2 = 0
let overHeating1 = false;
let overHeating2 = false;
let running = false

const collide = () => {
  let car1 = document.getElementById("car1").getBoundingClientRect();
  let car2 = document.getElementById("car2").getBoundingClientRect();
  let finishLine = document.getElementById("finish").getBoundingClientRect();
    if ((finishLine.x < car1.x + car1.width &&
        finishLine.x + finishLine.width > car1.x &&
        finishLine.y < car1.y + car1.height &&
        finishLine.y + finishLine.height > car1.y) && 
        (winnerFlag === true)){
        winnerFlag = false;
        winner1.innerText = "PLAYER 1 WON!";
        winner1.classList.add("active");
        setTimeout(() => {
            startGame.classList.toggle("none")
            running = true
            startGame.innerText = "PLAY AGAIN?"
            }, 3000)
        
    }
    else if ((finishLine.x < car2.x + car2.width &&
        finishLine.x + finishLine.width > car2.x &&
        finishLine.y < car2.y + car2.height &&
        finishLine.y + finishLine.height > car2.y)&& 
        (winnerFlag === true)) {
        winnerFlag = false;
        winner1.innerText = "PLAYER 2 WON!"
        winner1.classList.add("active2")
        setTimeout(() => {
            startGame.classList.toggle("none")
            running = true
            startGame.innerText = "PLAY AGAIN?"
            }, 3000)

    }
}


const runGame = () => {
    if (running){
    car1.classList.toggle("active")
        car2.classList.toggle("active")
        road.classList.toggle("active")
        building.classList.toggle("active")
        wheel1.forEach((w)=>{ w.classList.toggle("active")})
        wheel2.forEach((w)=>{ w.classList.toggle("active")})
        setTimeout(() => { 
            finish.classList.add("active")
        }, 15000)
    }
    else {
        location.reload()
    }
    
    document.addEventListener("keyup", (event) => {
    
        // Player 1
    if ((event.code === "KeyW") && (canSpeedUp1)){
        speed1 += 100

        if (speed1 >= 600){ 
            speed1 = 600
            canSpeedUp1 = false
            overHeating1 = true

            if (overHeating1 === true) {
                const heating = setInterval(() => { 
                engineBar.value++
                overHeating1 = false

                if (speed1 < 600) { clearInterval(heating) }
                if (engineBar.value === 10) {
                    speed1 = 10
                    canSpeedUp1 = false
                    canSpeedDown1 = false
                    overHeating1 = false
                    EngineOverHeat1.classList.toggle("hide")
                    setTimeout (() => {engineBar.value = 0}, 1000)
                    setTimeout (() => {
                        canSpeedUp1 = true
                        canSpeedDown1 = true
                        EngineOverHeat1.classList.toggle("hide")
                        }, 5000)
                    progressBar.value = speed1
                    player1.setAttribute("style", `left: ${speed1}px`);
                    clearInterval(heating)
                }
                }, 250);
            }
        }
    
        player1.setAttribute("style", `left: ${speed1}px`);
        progressBar.value = speed1
    }
    if ((event.code === "KeyE") && (canSpeedDown1)){
        speed1 -= 100
        canSpeedUp1 = true
        overHeating1 = false

        if (speed1 <= 100){
            speed1 = 100
            overHeating1 = false
        }
        player1.setAttribute("style", `left: ${speed1}px`);
        progressBar.value = speed1
    }



    // Player 2
    if ((event.code === "KeyP") && (canSpeedUp2)){
        speed2 += 100

        if (speed2 >= 600){ 
            speed2 = 600
            canSpeedUp2 = false
            overHeating2 = true

            if (overHeating2 === true) {
                const heating = setInterval(() => { 
                engineBar2.value++
                overHeating2 = false

                if (speed2 < 600) { clearInterval(heating) }
                if (engineBar2.value === 10) {
                    speed2 = 10
                    canSpeedUp2 = false
                    canSpeedDown2 = false
                    overHeating2 = false
                    EngineOverHeat2.classList.toggle("hide")
                    // setTimeout (() => {engineBar2.value = 0}, 1000)
                    setTimeout (() => {
                        engineBar2.value = 0
                        canSpeedUp2 = true
                        canSpeedDown2 = true
                        EngineOverHeat2.classList.toggle("hide")
                        }, 5000)
                    progressBar2.value = speed2
                    player2.setAttribute("style", `left: ${speed2}px`);
                    clearInterval(heating)
                }
                }, 250);
            }
        }
    
        player2.setAttribute("style", `left: ${speed2}px`);
        progressBar2.value = speed2
    }
    if ((event.code === "KeyO") && (canSpeedDown2)){
        speed2 -= 100
        canSpeedUp2 = true
        overHeating2 = false

        if (speed2 <= 100){
            speed2 = 100
            overHeating2 = false
        }
        player2.setAttribute("style", `left: ${speed2}px`);
        progressBar2.value = speed2
    }

})
}

    startGame.addEventListener("click",(e) => {
        running = !running
        e.currentTarget.classList.add("none")
        runGame()
    })

setInterval(collide,25) 