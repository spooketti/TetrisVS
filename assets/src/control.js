let singlePress = ["ArrowUp", "KeyZ", "Space", "KeyC", "KeyA"]
let keyPressed = {};
let repeatInterval = 80; // Interval in milliseconds

document.addEventListener('keydown', (event) => {
    if (singlePress.includes(event.code)) {
        if (event.repeat) {
            return
        }
        handleKey(event.code)
        return
    }
    if (!keyPressed[event.key]) {
        keyPressed[event.key] = true;
        setTimeout(() => {
            keyPressed[event.key + 'Interval'] = setInterval(() => {
                handleKey(event.code);
            }, repeatInterval);
            handleKey(event.code);
        }, 10);
    }
});

document.addEventListener('keyup', (event) => {
    keyPressed[event.key] = false;
    clearInterval(keyPressed[event.key + 'Interval']);
});

function handleKey(code) {
    switch (code) {
        case "ArrowRight":
            pieceMove(1, 0)
            break;

        case "ArrowDown":
            pieceMove(0, 1)
            break;

        case "ArrowLeft":
            pieceMove(-1, 0)
            break;

        case "ArrowUp":
            rotate(0)
            break;

        case "KeyZ":
            rotate(1)
            break;

        case "Space":
            hardDrop()
            checkLines()
            nextPiece()
            // spawnPiece(currentBag[0])
            break;

        case "KeyC":
            holdPiece()
            break;

        case "KeyA":
            rotate(2)
            break;
    }
}