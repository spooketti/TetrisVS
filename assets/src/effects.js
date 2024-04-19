let singleSound = new Audio("assets/audio/single.mp3")
let doubleSound = new Audio("assets/audio/double.mp3")
let tripleSound = new Audio("assets/audio/triple.mp3")
let quadSound = new Audio("assets/audio/quad.mp3")
let tssSound = new Audio("assets/audio/tss.mp3")
let tsdSound = new Audio("assets/audio/tsd.mp3")
let tstSound = new Audio("assets/audio/tst.mp3")
let pcSound = new Audio("assets/audio/pc.mp3")
let btbQuad = new Audio("assets/audio/btbquad.mp3")
let btbTSD = new Audio("assets/audio/btbtsd.mp3")
let btbTST = new Audio("assets/audio/btbtst.mp3")

let tSpinH = document.getElementById("TSpinH")
let pcBody = document.getElementById("PC")
let clearWord = document.getElementById("ClearWord")
let scoreboard = document.getElementById("score")
let score = 0
let isBTB = false
function clearEffect(lineCount, isTspin, isPC) {
    if (isPC) {
        let pcSpan = document.createElement("span")
        pcSpan.classList.add("PCSpan")
        pcSpan.style.transform = "scale(0)"
        pcSpan.innerText = "Perfect Clear"
        pcBody.appendChild(pcSpan)
        window.setTimeout(function () { pcSpan.style.transform = "scale(1.5)" }, 10)
        window.setTimeout(function () { pcSpan.style.transform = "scale(0)"; window.setTimeout(function () { pcSpan.remove() }, 500) }, 5000)
        pcSound.play()
        score += 2000
        scoreboard.innerText = "Score:" + score
        clearWord.style.opacity = "0"
        tSpinH.style.opacity = "0"
        return
    }
    clearWord.style.opacity = "0"
    tSpinH.style.opacity = "0"
    //console.log(lineCount)
    switch (lineCount) {
        case 1:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Single"
            if (isTspin) {
                if (isBTB) {
                    tSpinH.innerText = "BTB\nT-Spin"
                    tSpinH.style.opacity = "1"
                    tssSound.play()
                    break;
                }
                isBTB = true
                tSpinH.innerText = "T-Spin"
                tSpinH.style.opacity = "1"
                tssSound.play()
                break;
            }
            isBTB = false
            singleSound.currentTime = 0
            singleSound.play()
            score += 100
            scoreboard.innerText = "Score:" + score
            break;

        case 2:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Double"
            if (isTspin) {
                if (isBTB) {
                    tSpinH.innerText = "BTB\nT-Spin"
                    tSpinH.style.opacity = "1"
                    btbTSD.play()
                    break;
                }
                isBTB = true
                tSpinH.innerText = "T-Spin"
                tSpinH.style.opacity = "1"
                tsdSound.play()
                break;
            }
            isBTB = false
            score += 200
            scoreboard.innerText = "Score:" + score
            doubleSound.play()
            break;

        case 3:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Triple"
            if (isTspin) {
                if (isBTB) {
                    tSpinH.innerText = "BTB\nT-Spin"
                    tSpinH.style.opacity = "1"
                    btbTST.play()
                    break;
                }
                isBTB = true
                tSpinH.innerText = "T-Spin"
                tSpinH.style.opacity = "1"
                tstSound.play()
                break;
            }
            isBTB = false
            score += 300
            scoreboard.innerText = "Score:" + score
            tripleSound.play()
            break;

        case 4:
            clearWord.style.opacity = "1"
            clearWord.innerText = "Quad"
            if(isBTB)
            {
                tSpinH.innerText = "BTB"
                tSpinH.style.opacity = "1"
                btbQuad.play()
                break;
            }
            isBTB = true
            quadSound.play()
            score += 500
            scoreboard.innerText = "Score:" + score
            break;


    }
}