let ballsToRemove = 0
let clockIsTicking = true
const TIME_INTERVAL_IN_SECONDS = 1
let timerInterval

window.onload = function(){
    document.querySelector('.stopwatch').innerHTML = '00:00'
    const ballsSelector = document.getElementById("balls-selector")
    const buttonRemoveAllColors = document.getElementById('button-remove-all-colors')
    const buttonRemoveOneColor = document.getElementById('button-remove-one-color')

    ballsSelector.addEventListener("change", () =>{
        ballsToRemove = Number(ballsSelector.value)
        console.log(ballsToRemove)
    }) 

    buttonRemoveOneColor.addEventListener("click", () =>{
        buttonRemoveAllColors.disabled = true
    })

    buttonRemoveAllColors.addEventListener("click", () =>{
        buttonRemoveOneColor.disabled = true
    })

    document.getElementById('play-button').addEventListener("click", () =>{
        if(buttonRemoveAllColors.disabled){
            buttonRemoveAllColors.disabled = false
        }

        if(buttonRemoveOneColor.disabled){
            buttonRemoveOneColor.disabled = false
        }
        document.getElementById("game-options").style.display = 'none'
        startStopWatch()
        drawBubbles()
    })
    
}

function startStopWatch(){
    let seconds = 0
    let minutes = 0
    const addZero = (time) => { return time < 10 ? '0' : '' }
    timerInterval = setInterval(() => {
        if(clockIsTicking){
            minutes = seconds === 59 ? minutes + 1 : minutes + 0
            seconds = seconds === 59 ? 0 : seconds + 1
            document.querySelector('.stopwatch').innerHTML = `${addZero(minutes)}${minutes}:${addZero(seconds)}${seconds}`
        }
    }, TIME_INTERVAL_IN_SECONDS * 1000);
}

function drawBubbles(){
    for(let i=0; i<ballsToRemove; i++){
        const xAxysPx = getRandomNumber(800)
        const yAxysPx = getRandomNumber(800)
        const gameBoard = document.getElementById('game-board')
        const bubbleDiv = document.createElement('div')

        bubbleDiv.classList.add('red-bubble')
        bubbleDiv.style.width = 20
        bubbleDiv.style.height = 30
        bubbleDiv.style.transform = `translate(${xAxysPx}px, ${yAxysPx}px)`
    
        gameBoard.appendChild(bubbleDiv)
    }
}

function getRandomNumber(maxWidth){
    return Math.floor(Math.random() * maxWidth) + 1;
}