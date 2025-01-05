const COLORS = ['green', 'red', 'blue']
const HIDE_ELEMENTS_CLASSNAME = 'hide-elements'
const TIME_INTERVAL_IN_SECONDS = 1

let ballsToRemove = 0
let gameMode = ""
let gameDifficulty = "no-difficulty-assigned"
let clockIsTicking = true
let timerInterval
let windowWidth
let windowHeight
let colorSelected
let timeIsUp
let countGreenBubblesPopped = 0
let countRedBubblesPopped = 0
let countBlueBubblesPopped = 0
let numberBallsColorSelected = 0

window.onload = function(){
    document.querySelector('.stopwatch').innerHTML = '00:00'
    windowWidth = 1200;
    windowHeight = window.innerHeight;
    settingsParametersToPlay()
    buildGame()
}

function settingsParametersToPlay(){
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
            gameMode = "Remove One Color"
            openDialog(dialog)
        }
    })

    buttonRemoveAllColors.addEventListener("click", () =>{
        disableEnableButton(buttonRemoveOneColor)
        if(buttonRemoveOneColor.disabled && ballsToRemove > 0){
            gameMode = "Remove All Colors"
            openDialog(dialog)
        }
    })
}

function disableEnableButton(button){
    button.disabled = !button.disabled
}

function buildGame(){
    document.getElementById('play-button').addEventListener("click", () =>{
        const chosenColorId = "chosen-color"
        addClass(chosenColorId, HIDE_ELEMENTS_CLASSNAME)

        const gameBoardId = "game-board"
        removeClass(gameBoardId, HIDE_ELEMENTS_CLASSNAME)

        const gameStatusId = "game-status"
        removeClass(gameStatusId, HIDE_ELEMENTS_CLASSNAME)

        startStopWatch()
        drawBubbles()
        displayCurrentGameStatus()
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
        bubbleDiv.classList.add('box-shadow')

        drawBubbleColor(bubbleDiv, i)

        const size = getRandomNumber(100, 30)   
        bubbleDiv.style.width = size
        bubbleDiv.style.height = size

        document.getElementById('game-board').appendChild(bubbleDiv)

        poppingBubble(bubbleDiv)   
    }
}

function getRandomNumber(maxNumberInterval, minNumberInterval){
    const max = maxNumberInterval
    const min = minNumberInterval ? minNumberInterval : 0
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function poppingBubble(bubbleDiv){
    bubbleDiv.addEventListener("click", () =>{
        const classListNamesOnElement = Object.values(bubbleDiv.classList)

        const red = classListNamesOnElement.filter(name => name.includes("red"))
        const green = classListNamesOnElement.filter(name => name.includes("green"))
        const blue = classListNamesOnElement.filter(name => name.includes("blue"))

        countGreenBubblesPopped += green.length > 0 ? 1 : 0
        countRedBubblesPopped += red.length > 0 ? 1 : 0
        countBlueBubblesPopped += blue.length > 0 ? 1 : 0

        displayCurrentGameStatus()
        checkGameStatus()
        bubbleDiv.remove();
    })
}

function checkGameStatus(){
    const totalCount = countGreenBubblesPopped + countRedBubblesPopped + countBlueBubblesPopped
    const dialogGameFinished = document.getElementById('dialog-game-finished')
    if(gameMode.includes("One")){
        if(colorSelected.includes("green") && countGreenBubblesPopped === numberBallsColorSelected){
            clockIsTicking = false
            displayFinalResults()
            openDialog(dialogGameFinished)
        }
    
        if(colorSelected.includes("red") && countRedBubblesPopped === numberBallsColorSelected){
            clockIsTicking = false
            displayFinalResults()
            openDialog(dialogGameFinished)
        }
    
        if(colorSelected.includes("blue") && countBlueBubblesPopped === numberBallsColorSelected){
            clockIsTicking = false
            displayFinalResults()
            openDialog(dialogGameFinished)
        }
    }else{
        if(totalCount === ballsToRemove){
            clockIsTicking = false
            displayFinalResults()
            openDialog(dialogGameFinished)         
        }
    }  
}

function displayFinalResults(){
    let finalInfo = ""
    finalInfo += `Time info: ${timeIsUp}`
    finalInfo += `<p><span style="color: green;">Green</span> bubbles popped: ${countGreenBubblesPopped}</p>`
    finalInfo += `<p><span style="color: red;">Red</span> bubbles popped: ${countRedBubblesPopped}</p>`
    finalInfo += `<p><span style="color: blue;">Blue</span> bubbles popped: ${countBlueBubblesPopped}</p>`
    document.getElementById("display-finished-results").innerHTML = finalInfo
}

function displayCurrentGameStatus(){
    document.getElementById("green-bubbles-number").innerText = countGreenBubblesPopped
    document.getElementById("red-bubbles-number").innerText = countRedBubblesPopped
    document.getElementById("blue-bubbles-number").innerText = countBlueBubblesPopped
}

function drawBubbleColor(bubbleDiv, index){
    const lessThanHalfBallsNumber = index < ballsToRemove/2
    if(gameMode.includes('One')){
        const bubbleColorClassName = lessThanHalfBallsNumber ? `${colorSelected}` : `${COLORS[getRandomNumber(COLORS.length-1)]}-bubble`
        numberBallsColorSelected += bubbleColorClassName === colorSelected ? 1 : 0
        bubbleDiv.classList.add(bubbleColorClassName)
        if(lessThanHalfBallsNumber && gameDifficulty.toLowerCase() === "easy"){
            bubbleDiv.style.zIndex = 1
        }
    }else{
        bubbleDiv.classList.add(`${colorSelected}`)
    }
}

function openDialog(dialog){
    dialog.showModal()

    document.getElementById('yes-btn').addEventListener("click", () =>{
        const gameOptionsId = "game-options"
        addClass(gameOptionsId, HIDE_ELEMENTS_CLASSNAME)

        const chosenColorId = "chosen-color"
        removeClass(chosenColorId, HIDE_ELEMENTS_CLASSNAME)

        const randomColor = COLORS[getRandomNumber(COLORS.length-1)]
        const bubbleColorChosenId = "buble-color-chosen-random"
        colorSelected = `${randomColor}-bubble`
        document.getElementById(bubbleColorChosenId).style.background = randomColor
        
        const bubbleElementToDisplayColor = document.getElementById(bubbleColorChosenId)
        bubbleElementToDisplayColor.style.width = 200
        bubbleElementToDisplayColor.style.height = 200
        bubbleElementToDisplayColor.style.position = 'static'

        dialog.close()
    })

    document.getElementById('go-to-settings-btn').addEventListener("click", () =>{
        dialog.close()
    })

    document.getElementById('start-over-btn').addEventListener("click", () =>{
        window.location.reload()
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
