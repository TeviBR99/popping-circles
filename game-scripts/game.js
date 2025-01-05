const COLORS = ['green', 'red', 'blue']
const HIDE_ELEMENTS_CLASSNAME = 'hide-elements'
const TIME_INTERVAL_IN_SECONDS = 1

let ballsToRemove = 0
let gameMode = ""
let clockIsTicking = true
let timerInterval
let windowWidth
let windowHeight
let colorClassNameSelected
let timeIsUp

window.onload = function(){
    document.querySelector('.stopwatch').innerHTML = '00:00'
    windowWidth = 1200;
    windowHeight = window.innerHeight;

    const ballsSelector = document.getElementById("balls-selector")
    const buttonRemoveAllColors = document.getElementById('button-remove-all-colors')
    const buttonRemoveOneColor = document.getElementById('button-remove-one-color')
    const dialog = document.getElementById('dialog-confirm-selection')

    ballsSelector.addEventListener("change", () =>{
        ballsToRemove = Number(ballsSelector.value)
        if( (!buttonRemoveAllColors.disabled && buttonRemoveOneColor.disabled) || (buttonRemoveAllColors.disabled && !buttonRemoveOneColor.disabled) ){
            openDialog(dialog)
        }
    }) 

    buttonRemoveOneColor.addEventListener("click", () =>{
        disableEnableButton(buttonRemoveAllColors)
        if(buttonRemoveAllColors.disabled && ballsToRemove > 0){
            openDialog(dialog)
        }
    })

    buttonRemoveAllColors.addEventListener("click", () =>{
        disableEnableButton(buttonRemoveOneColor)
        if(buttonRemoveOneColor.disabled && ballsToRemove > 0){
            openDialog(dialog)
        }
    })

    document.getElementById('play-button').addEventListener("click", () =>{
        const chosenColorId = "chosen-color"
        addClass(chosenColorId, HIDE_ELEMENTS_CLASSNAME)

        const gameBoardId = "game-board"
        removeClass(gameBoardId, HIDE_ELEMENTS_CLASSNAME)

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
            let timeIsTicking = `${addZero(minutes)}${minutes}:${addZero(seconds)}${seconds}`
            timeIsUp = timeIsTicking
            document.querySelector('.stopwatch').innerHTML = `${timeIsTicking}`
        }
    }, TIME_INTERVAL_IN_SECONDS * 1000);
}

function drawBubbles(){
    for(let i=0; i<ballsToRemove; i++){
        const bubbleDiv = document.createElement('div')

        const xAxysPx = getRandomNumber(windowWidth)
        const yAxysPx = getRandomNumber(windowHeight)
        bubbleDiv.style.transform = `translate(${xAxysPx}px, ${yAxysPx}px)`
        
        bubbleDiv.classList.add('bubble')
        bubbleDiv.classList.add(`${colorSelected}`)
        bubbleDiv.classList.add('box-shadow')  

        const size = getRandomNumber(100, 30)   
        bubbleDiv.style.width = size
        bubbleDiv.style.height = size
        
        document.getElementById('game-board').appendChild(bubbleDiv)
    }
}

function getRandomNumber(maxNumberInterval, minNumberInterval){
    const max = maxNumberInterval
    const min = minNumberInterval ? minNumberInterval : 0
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openDialog(dialog){
    dialog.showModal()
    document.getElementById('yes-btn').addEventListener("click", () =>{
        const gameOptionsId = "game-options"
        addClass(gameOptionsId, HIDE_ELEMENTS_CLASSNAME)

        const chosenColorId = "chosen-color"
        removeClass(chosenColorId, HIDE_ELEMENTS_CLASSNAME)

        const bubbleColorChosenId = "buble-color-chosen-random"
        colorSelected = `${COLORS[getRandomNumber(COLORS.length-1)]}-bubble`
        addClass(bubbleColorChosenId, `${colorSelected}`)
        
        const bubbleElementToDisplayColor = document.getElementById(bubbleColorChosenId)
        bubbleElementToDisplayColor.style.width = 200
        bubbleElementToDisplayColor.style.height = 200
        bubbleElementToDisplayColor.style.position = 'static'

        dialog.close()
    })

    document.getElementById('go-to-settings-btn').addEventListener("click", () =>{
        dialog.close()
    })
}

function removeClass(id, className){
    const element = document.getElementById(id)
    if(element && element.classList.contains(className)){
        element.classList.remove(className)
    }
}

function addClass(id, className){
    const element = document.getElementById(id)
    if(element && !element.classList.contains(className)){
        element.classList.add(className)
    }
}
