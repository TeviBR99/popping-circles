window.onload = function(){
    const selector = document.getElementById("balls-selector")
    console.log("selector: ", selector)
    selector.addEventListener("change", () =>{
        console.log("Option selected: ", selector.value)
    })
}