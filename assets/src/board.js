let board = document.getElementById("board")
let bCTX = board.getContext("2d")
//consider making the rows bigger or smaller for custom gamemodes like 4 wide
let rows = 10
let cols = 20
let matrix = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
let hold = document.getElementById("hold")
let hCTX = hold.getContext("2d")
let queue = document.getElementById("queue")
let qCTX = queue.getContext("2d")

let colorTable =
{
    7: "#f0f000", //OIZTLJS
    6: "#00f0f0",
    5: "#f00000",
    4: "#a000f0",
    2: "#f0a000",
    1: "#0000f0",
    3: "#00f000"
}

function initBoard() {
    bCTX.strokeStyle = "rgb(255,255,255)"
    hCTX.strokeStyle = "rgb(255,255,255)"
    qCTX.strokeStyle = "rgb(255,255,255)"
    for (let y = 0; y < 20; y++) {
        qCTX.beginPath()
        qCTX.moveTo(0, 24 * y);
        qCTX.lineTo(240, 24 * y)
        bCTX.beginPath();
        bCTX.moveTo(0, 24 * y);
        bCTX.lineTo(240, 24 * y)
        bCTX.moveTo(24 * y, 0);
        bCTX.lineTo(24 * y, 480)
        bCTX.stroke()
        qCTX.stroke()
    }
    for (let y = 0; y < 4; y++) {
        hCTX.beginPath();
        qCTX.beginPath()
        hCTX.moveTo(0, 24 * y);
        hCTX.lineTo(96, 24 * y)
        hCTX.moveTo(24 * y, 0);
        hCTX.lineTo(24 * y, 96);
        qCTX.moveTo(24 * y, 0);
        qCTX.lineTo(24 * y, 240)
        hCTX.stroke()
        qCTX.stroke()
    }

}

function drawBoard() {
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            bCTX.clearRect((x * 24) + 1, (y * 24) + 1, 22, 22)
            if (matrix[y][x] != 0) {
                bCTX.fillStyle = colorTable[matrix[y][x]]
                bCTX.fillRect((x * 24) + 1, (y * 24) + 1, 22, 22)
            }
        }
    }
}

function drawHold() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            hCTX.clearRect((x * 24) + 1, (y * 24) + 1, 22, 22)
        }
    }

    switch (currentHold) {
        case "O":
            hCTX.fillStyle = colorTable[oTable[0][0]]
            for (let y = 0; y < 2; y++) {
                for (let x = 0; x < 2; x++) {
                    hCTX.fillRect(((x + 1) * 24) + 1, ((y + 1) * 24) + 1, 22, 22)
                }
            }
            break;
        case "I":
            hCTX.fillStyle = colorTable[iTable[1][1]]
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    if (iTable[y][x] != 0) {
                        hCTX.fillRect((x * 24) + 1, (y * 24) + 1, 22, 22)
                    }
                }
            }
            break;
        default:
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    if (tableMap[currentHold][y][x] != 0) {
                        hCTX.fillStyle = colorTable[tableMap[currentHold][y][x]]
                        hCTX.fillRect(((x + 1) * 24) + 1, ((y + 1) * 24) + 1, 22, 22)
                    }
                }
            }
            break;
    }
}

function drawQueue(queue) {
    for (let i = 0; i < queue.length; i++) {
        let pieceToDraw = tableMap[queue[i]]
        for (let y = 0; y < pieceToDraw.length; y++) {
            for (let x = 0; x < pieceToDraw.length; x++) {
                qCTX.fillStyle = colorTable[pieceToDraw[y][x]]
                qCTX.fillRect((x * 24) + 1, ((2*y) * 24) + 1, 22, 22)
            }
        }
    }
}



initBoard()
drawBoard()