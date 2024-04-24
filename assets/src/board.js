let board = document.getElementById("board")
let bCTX = board.getContext("2d")
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

function drawGhost(dy) {
    for (let y = currentPiece.y + dy; y < currentPiece.y + dy+currentPiece.pieceArr.length; y++) {
        for (let x = currentPiece.x; x < currentPiece.pieceArr.length+currentPiece.x; x++) {
            if(y>19)
            {
                continue
            }
            if (matrix[y][x] == 0) {
                if(currentPiece.pieceArr[y - currentPiece.y-dy][x-currentPiece.x]!=0)
                {
                    bCTX.fillStyle = colorTable[currentPiece.pieceArr[y - currentPiece.y-dy][x-currentPiece.x]]+"70"
                    bCTX.fillRect((x * 24) + 1, (y * 24) + 1, 22, 22)
                }
            }
        }
    }
}

function drawHold(isHoldLocked) {
    if(!currentHold)
    {
        return
    }
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            hCTX.clearRect((x * 24) + 1, (y * 24) + 1, 22, 22)
        }
    }

    let notIBuffer = 1
    if(currentHold == "I")
    {
        notIBuffer = 0
    }

    for (let y = 0; y < tableMap[currentHold].length; y++) {
        for (let x = 0; x < tableMap[currentHold].length; x++) {
            if (tableMap[currentHold][y][x] != 0) {
                hCTX.fillStyle = colorTable[tableMap[currentHold][y][x]]
                if(isHoldLocked)
                {
                    hCTX.fillStyle = "#ffffff"
                }
                hCTX.fillRect(((x + notIBuffer) * 24) + 1, ((y + 1) * 24) + 1, 22, 22)
            }
        }
    }
   
}

function drawQueue(queue) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 4; x++) {
            qCTX.clearRect((x * 24) + 1, (y * 24) + 1, 22, 22)
        }
    }
    let queueMatrix = []
    for (let i = 0; i < queue.length; i++) {
        let iterpiece = tableMap[queue[i]].map(function (arr) {
            return arr.slice();
        });
        switch(queue[i])
        {
            case "O":
                centerBuffer = 1
            break;

            case"I":
                iterpiece = 
                [
                    [0, 0, 0, 0],
                    [6, 6, 6, 6]
                ]
            break;

            default:
                iterpiece.splice(2, 1)
            break;
        }
        for (let y = 0; y < 2; y++) {
           queueMatrix.push(iterpiece[y])
        }
    }
    for(let y=0;y<10;y++)
    {
        for(let x=0;x<queueMatrix[y].length;x++)
        {
            if(queueMatrix[y][x] != 0)
            {
                if(queueMatrix[y][x] == 7)
                {
                    qCTX.fillStyle = colorTable[queueMatrix[y][x]]
                    qCTX.fillRect(((x+1) * 24) + 1, (y * 24) + 1, 22, 22)
                    continue
                }
                qCTX.fillStyle = colorTable[queueMatrix[y][x]]
                qCTX.fillRect(((x) * 24) + 1, (y * 24) + 1, 22, 22)
            }
        }
    }

}

initBoard()
drawBoard()