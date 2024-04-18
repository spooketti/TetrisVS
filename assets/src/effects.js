let singleSound = new Audio("assets/audio/single.mp3")
let doubleSound = new Audio("assets/audio/double.mp3")
let tripleSound = new Audio("assets/audio/triple.mp3")
let quadSound = new Audio("assets/audio/quad.mp3")
let tsdSound = new Audio("assets/audio/tsd.mp3")
let tstSound = new Audio("assets/audio/tst.mp3")
let pcSound  = new Audio("assets/audio/pc.mp3")
let tSpinH = document.getElementById("TSpinH")
let pcBody = document.getElementById("PC")
let clearWord = document.getElementById("ClearWord")
let scoreboard = document.getElementById("score")
let score = 0
function clearEffect(lineCount,isTspin,isPC)
{
    if(isPC)
    {
        let pcSpan = document.createElement("span")
        pcSpan.classList.add("PCSpan")
        pcSpan.style.transform = "scale(0)"
        pcSpan.innerText = "Perfect Clear"
        pcBody.appendChild(pcSpan)
        window.setTimeout(function(){pcSpan.style.transform = "scale(1.5)"},10)
        window.setTimeout(function(){pcSpan.style.transform = "scale(0)";window.setTimeout(function(){pcSpan.remove()},500)},5000)
        pcSound.play()
        score += 2000
        scoreboard.innerText = "Score:" + score
        return
    }
    clearWord.style.opacity = "0"
    tSpinH.style.opacity = "0"
    //console.log(lineCount)
    switch(lineCount)
    {
        case 1:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Single"
            singleSound.play()
            score += 100
            scoreboard.innerText = "Score:" + score
        break;

        case 2:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Double"
            if(isTspin)
            {
                tSpinH.innerText = "T-Spin"
                tSpinH.style.opacity = "1"
                tsdSound.play()
                break;
            }
            score += 200
            scoreboard.innerText = "Score:" + score
            doubleSound.play()
        break;

        case 3:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Triple"
            if(isTspin)
            {
                tSpinH.innerText = "T-Spin"
                tSpinH.style.opacity = "1"
                tstSound.play()
                break;
            }
            score += 300
            scoreboard.innerText = "Score:" + score
            tripleSound.play()
        break;

        case 4:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Quad"
            quadSound.play()
            score += 500
            scoreboard.innerText = "Score:" + score
        break;


    }
}