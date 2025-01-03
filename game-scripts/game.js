let ballsToRemove = 0


window.onload = function(){
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

    document.querySelector('.play-button').addEventListener("click", () =>{
        console.log('play')
        if(buttonRemoveAllColors.disabled){
            buttonRemoveAllColors.disabled = false
        }

        if(buttonRemoveOneColor.disabled){
            buttonRemoveOneColor.disabled = false
        }
    })
    
}

function drawBalls(){

}