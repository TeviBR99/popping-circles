let ballsToRemove = 0
let clockIsTicking = true
const TIME_INTERVAL_IN_SECONDS = 1
let timerInterval
let windowWidth
let windowHeight

window.onload = function(){
    document.querySelector('.stopwatch').innerHTML = '00:00'
    console.log(window)
    // windowWidth = 1300;
    windowWidth = 1200;
    windowHeight = window.innerHeight;

    const ballsSelector = document.getElementById("balls-selector")
    const buttonRemoveAllColors = document.getElementById('button-remove-all-colors')
    const buttonRemoveOneColor = document.getElementById('button-remove-one-color')

    ballsSelector.addEventListener("change", () =>{
        ballsToRemove = Number(ballsSelector.value)
        console.log(ballsToRemove)
    }) 

    buttonRemoveOneColor.addEventListener("click", () =>{
        disableEnableButton(buttonRemoveAllColors)
    })

    buttonRemoveAllColors.addEventListener("click", () =>{
        disableEnableButton(buttonRemoveOneColor)
    })

    document.getElementById('play-button').addEventListener("click", () =>{
        if(buttonRemoveAllColors.disabled){
            buttonRemoveAllColors.disabled = false
        }

        if(buttonRemoveOneColor.disabled){
            buttonRemoveOneColor.disabled = false
        }
        document.getElementById("game-options").style.display = 'none'
        document.getElementById("game-board").style.display = 'block'
        startStopWatch()
        drawBubbles()
    })
}

function disableEnableButton(button){
    button.disabled = !button.disabled
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
        const xAxysPx = getRandomNumber(windowWidth)
        const yAxysPx = getRandomNumber(windowHeight)
        const gameBoard = document.getElementById('game-board')
        const bubbleDiv = document.createElement('div')
        
        bubbleDiv.classList.add('red-bubble')
        bubbleDiv.classList.add('box-shadow')
        const size = getRandomNumber(100, 30)
        bubbleDiv.style.width = size
        bubbleDiv.style.height = size
        bubbleDiv.style.transform = `translate(${xAxysPx}px, ${yAxysPx}px)`

        gameBoard.appendChild(bubbleDiv)
    }
}

function getRandomNumber(maxNumberInterval, minNumberInterval){
    const max = maxNumberInterval
    const min = minNumberInterval ? minNumberInterval : 0
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

