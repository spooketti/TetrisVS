const bag = ["T", "J", "O", "Z", "S", "L", "I"]
let currentBag = shuffle()
let currentPiece = new piece()
let currentHold = null

function shuffle() {
    return bag.toSorted(() => Math.random() - 0.5);
};


function spawnPiece(piece) {
    switch (piece) {
        case "O":
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    matrix[i][j+4] = oTable[i][j]
                    
                }
            }
            currentPiece.x = 4
            currentPiece.y = 0
            currentPiece.pieceID = "O"
            currentPiece.pieceArr = oTable.map(function(arr) {
                return arr.slice();
            });
            drawBoard()
            break;
        case "I":
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    matrix[i][j+3] = iTable[i][j]
                }
            }
            currentPiece.x = 3
            currentPiece.y = 0
            currentPiece.pieceID = "I"
            currentPiece.pieceArr = iTable.map(function(arr) {
                return arr.slice();
            });
            drawBoard()
            break;
        default:
            for(let i=0;i<3;i++)
            {
                for(let j=0;j<3;j++)
                {
                    matrix[i][j+3] = tableMap[piece][i][j]
                }
            }
            currentPiece.x = 3
            currentPiece.y = 0
            currentPiece.pieceID = piece
            currentPiece.pieceArr = tableMap[piece].map(function(arr) {
                return arr.slice();
            });
            drawBoard()
        break;
    }
}



function nextPiece() {
    currentBag.shift()
    if (currentBag.length <= 0) {
        currentBag = shuffle()
    }
    spawnPiece(currentBag[0])
}

function pieceMove(isClear)
{
    switch(currentPiece.pieceID)
    {
        case "O":
            for (let i = currentPiece.y; i < currentPiece.y+2; i++) {
                for (let j = currentPiece.x; j < currentPiece.x+2; j++) {
                    matrix[i][j] = currentPiece.pieceArr[0][0]
                    if(isClear)
                    {
                        matrix[i][j] = 0
                    }
                }
            }
            drawBoard()
        break;
        case "I":
            for (let i = currentPiece.y; i < currentPiece.y+4; i++) {
                for (let j = currentPiece.x; j < currentPiece.x+4; j++) {
                    matrix[i][j] = currentPiece.pieceArr[i-currentPiece.y][j-currentPiece.x]
                    if(isClear)
                    {
                        matrix[i][j] = 0
                    }
                }
            }
            drawBoard()
        break;
        default:
            for (let i = currentPiece.y; i < currentPiece.y+3; i++) {
                for (let j = currentPiece.x; j < currentPiece.x+3; j++) {
                    matrix[i][j] = currentPiece.pieceArr[i-currentPiece.y][j-currentPiece.x]
                    if(isClear)
                    {
                        matrix[i][j] = 0
                    }
                }
            }
            drawBoard()
        break;
    }
}

function clamp(num, lower, upper) {
    return Math.min(Math.max(num, lower), upper);
}

function rotateClockwise()
{
    currentPiece.pieceArr = currentPiece.pieceArr[0].map((val, index) => currentPiece.pieceArr.map(row => row[index]).reverse())
}

function rotate180()
{
    currentPiece.pieceArr.reverse().forEach(function(item) { item.reverse(); } );
}

function rotateCounterClockwise()
{
    currentPiece.pieceArr = currentPiece.pieceArr[0].map((val, index) => currentPiece.pieceArr.map(row => row[row.length-1-index]))
}

function holdPiece()
{
    if(!currentHold)
    {
        currentHold = currentBag[0]
        nextPiece()
    }
    else
    {
        let temp = currentBag[0]
        currentBag[0] = currentHold
        currentHold = temp
        currentHold = currentPiece.pieceID
        spawnPiece(currentBag[0])
    }
    drawHold()
    
}

document.addEventListener("keydown",function(e)
{
    switch(e.code)
    {
        
        case "ArrowRight":
            pieceMove(true)
            currentPiece.x++;
            //currentPiece.x = clamp(currentPiece.x,0,8)
            pieceMove(false)
        break;

        case "ArrowDown":
            pieceMove(true)
            currentPiece.y++;
            //currentPiece.y = clamp(currentPiece.y,0,18)
            pieceMove(false)
        break;

        case "ArrowLeft":
            pieceMove(true)
            currentPiece.x--;
            //  currentPiece.x = clamp(currentPiece.x,0,8)
            pieceMove(false)
        break;

        case "ArrowUp":
        pieceMove(true)
        rotateClockwise()
        pieceMove(false)
        break;

        case "KeyZ":
        pieceMove(true)
        rotateCounterClockwise()
        pieceMove(false)
        break;

        case "Space":
        nextPiece()
        spawnPiece(currentBag[0])
        break;

        case "KeyC":
        pieceMove(true)
        holdPiece()
        break;

        case "KeyA":
        pieceMove(true)
        rotate180()
        pieceMove(false)

    }
})

spawnPiece(currentBag[0])