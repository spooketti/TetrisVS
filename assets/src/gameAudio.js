let singleSound = new Audio("assets/audio/single.mp3")
let tSpinH = document.getElementById("TSpinH")
let clearWord = document.getElementById("ClearWord")
function clearEffect(lineCount)
{
    switch(lineCount)
    {
        case 1:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Single"
        break;

        case 2:
            clearWord.innerText = "Double"
        break;

        case 3:
            clearWord.innerText = "Triple"
        break;

        case 4:
            clearWord.innerText = "Quad"
        break;


    }
}