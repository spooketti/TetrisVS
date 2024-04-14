const bag = ["T", "J", "O", "Z", "S", "L", "I"]
let currentBag = shuffle()
let nextBag = shuffle()
let currentPiece = new piece()
let currentHold = null
safeboard = matrix.map(function(arr) {
    return arr.slice();
});

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
        nextBag = shuffle()
    }
    spawnPiece(currentBag[0])
}

function pieceMove(isClear,dx,dy)
{
    if(isClear) //why does this work?
    {
    safeboard = matrix.map(function(arr) {
        return arr.slice();
    });
    }
    let isValid = true;

    switch(currentPiece.pieceID)
    {
        case "O":
            currentPiece.y = clamp(currentPiece.y,0,18)
            currentPiece.x = clamp(currentPiece.x,0,8)
            if((currentPiece.x == 8 && dx >= 1) || (currentPiece.x == 0 && dx <= -1) || (currentPiece.y == 18 && dy >= 1))
            {
                drawBoard()
                return;
            }
            for (let i = currentPiece.y; i < currentPiece.y+2; i++) {
                for (let j = currentPiece.x; j < currentPiece.x+2; j++) {
                    matrix[i][j] = 0
                }
            }
            if(isClear)
            {
                drawBoard()
                return;
            }
            //simulate next position
            for (let i = currentPiece.y+dy; i < currentPiece.y+dy+2; i++) {
                for (let j = currentPiece.x+dx; j < currentPiece.x+dx+2; j++) {
                    if(matrix[i][j] != 0)
                    {
                        isValid = false;
                    }
                    matrix[i][j] = currentPiece.pieceArr[0][0]
                }
            }
            currentPiece.x += dx
            currentPiece.y += dy
            if(!isValid)
            {
                currentPiece.x -= dx
                currentPiece.y -= dy
                matrix = safeboard.map(function(arr) {
                    return arr.slice();
                });
            }
            drawBoard()
        break;
        case "I":
            for (let i = currentPiece.y; i < currentPiece.y+4; i++) {
                for (let j = currentPiece.x; j < currentPiece.x+4; j++) {
                    if(currentPiece.pieceArr[i-currentPiece.y][j-currentPiece.x]!=0)
                    {
                        matrix[i][j] = 0
                    }
                }
            }
            if(isClear)
            {
                drawBoard()
                return;
            }
            //simulate next position
            for (let i = currentPiece.y+dy; i < currentPiece.y+dy+4; i++) {
                for (let j = currentPiece.x+dx; j < currentPiece.x+dx+4; j++) {
                    if(matrix[i][j] != 0)
                    {
                        if(currentPiece.pieceArr[i-currentPiece.y-dy][j-currentPiece.x-dx]==0)
                        {
                            console.log(currentPiece.pieceArr)
                            continue
                        }
                        isValid = false
                    }
                    matrix[i][j] = currentPiece.pieceArr[i-currentPiece.y-dy][j-currentPiece.x-dx]
                }
            }
            currentPiece.x += dx
            currentPiece.y += dy
            if(!isValid)
            {
                currentPiece.x -= dx
                currentPiece.y -= dy
                matrix = safeboard.map(function(arr) {
                    return arr.slice();
                });
            }
            drawBoard()
        break;
        default:
            /*
            currentPiece.y = clamp(currentPiece.y,0,18)
            currentPiece.x = clamp(currentPiece.x,0,8)
            if((currentPiece.x == 8 && dx >= 1) || (currentPiece.x == 0 && dx <= -1) || (currentPiece.y == 18 && dy >= 1))
            {
                drawBoard()
                return;
            }
            */
            for (let i = currentPiece.y; i < currentPiece.y+3; i++) {
                for (let j = currentPiece.x; j < currentPiece.x+3; j++) {
                    if(currentPiece.pieceArr[i-currentPiece.y][j-currentPiece.x]!=0)
                    {
                        matrix[i][j] = 0
                    }
                }
            }
            if(isClear)
            {
                drawBoard()
                return;
            }
            //simulate next position
            for (let i = currentPiece.y+dy; i < currentPiece.y+dy+3; i++) {
                for (let j = currentPiece.x+dx; j < currentPiece.x+dx+3; j++) {
                    if(matrix[i][j] != 0)
                    {
                        if(currentPiece.pieceArr[i-currentPiece.y-dy][j-currentPiece.x-dx]==0)
                        {
                            console.log(currentPiece.pieceArr)
                            continue
                        }
                        isValid = false
                    }
                    matrix[i][j] = currentPiece.pieceArr[i-currentPiece.y-dy][j-currentPiece.x-dx]
                }
            }
            currentPiece.x += dx
            currentPiece.y += dy
            if(!isValid)
            {
                currentPiece.x -= dx
                currentPiece.y -= dy
                matrix = safeboard.map(function(arr) {
                    return arr.slice();
                });
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

/*
window.setInterval(function(){
    pieceMove(true,0,1)
    pieceMove(false,0,1)
},500)
*/


spawnPiece(currentBag[0])