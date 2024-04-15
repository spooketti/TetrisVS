const bag = ["T", "J", "O", "Z", "S", "L", "I"]
let currentBag = shuffle()
let nextBag = shuffle()
let currentPiece = new piece()
let currentHold = null
safeboard = matrix.map(function (arr) {
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
                    matrix[i][j + 4] = oTable[i][j]

                }
            }
            currentPiece.x = 4
            currentPiece.y = 0
            currentPiece.pieceID = "O"
            currentPiece.pieceArr = oTable.map(function (arr) {
                return arr.slice();
            });
            drawBoard()
            break;
        case "I":
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    matrix[i][j + 3] = iTable[i][j]
                }
            }
            currentPiece.x = 3
            currentPiece.y = 0
            currentPiece.pieceID = "I"
            currentPiece.pieceArr = iTable.map(function (arr) {
                return arr.slice();
            });
            drawBoard()
            break;
        default:
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    matrix[i][j + 3] = tableMap[piece][i][j]
                }
            }
            currentPiece.x = 3
            currentPiece.y = 0
            currentPiece.pieceID = piece
            currentPiece.pieceArr = tableMap[piece].map(function (arr) {
                return arr.slice();
            });
            drawBoard()
            break;
    }
}



function nextPiece() {
    currentBag.shift()
    if (currentBag.length <= 0) {
        currentBag = [...nextBag]
        nextBag = shuffle()
    }
    spawnPiece(currentBag[0])
    drawQueue(currentBag.concat(nextBag).slice(0,5))
}

function pieceMove(isClear, dx, dy) {
    if (isClear) //why does this work?
    {
        safeboard = matrix.map(function (arr) {
            return arr.slice();
        });
    }
    let isMoveValid = true;

    switch (currentPiece.pieceID) {
        case "O":
            currentPiece.y = clamp(currentPiece.y, 0, 18)
            currentPiece.x = clamp(currentPiece.x, 0, 8)
            if ((currentPiece.x == 8 && dx >= 1) || (currentPiece.x == 0 && dx <= -1) || (currentPiece.y == 18 && dy >= 1)) {
                drawBoard()
                return;
            }
            for (let i = currentPiece.y; i < currentPiece.y + 2; i++) {
                for (let j = currentPiece.x; j < currentPiece.x + 2; j++) {
                    matrix[i][j] = 0
                }
            }
            if (isClear) {
                drawBoard()
                return;
            }
            //simulate next position
            for (let i = currentPiece.y + dy; i < currentPiece.y + dy + 2; i++) {
                for (let j = currentPiece.x + dx; j < currentPiece.x + dx + 2; j++) {
                    if (matrix[i][j] != 0) {
                        isMoveValid = false;
                    }
                    matrix[i][j] = currentPiece.pieceArr[0][0]
                }
            }
            currentPiece.x += dx
            currentPiece.y += dy
            if (!isMoveValid) {
                currentPiece.x -= dx
                currentPiece.y -= dy
                matrix = safeboard.map(function (arr) {
                    return arr.slice();
                });
            }
            drawBoard()
            break;
        case "I":
            for (let i = currentPiece.y; i < currentPiece.y + 4; i++) {
                for (let j = currentPiece.x; j < currentPiece.x + 4; j++) {
                    if (currentPiece.pieceArr[i - currentPiece.y][j - currentPiece.x] != 0) {
                        matrix[i][j] = 0
                    }
                }
            }
            if (isClear) {
                drawBoard()
                return;
            }
            //simulate next position
            for (let i = currentPiece.y + dy; i < currentPiece.y + dy + 4; i++) {
                for (let j = currentPiece.x + dx; j < currentPiece.x + dx + 4; j++) {
                    if (i > 19) {
                        if (currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x - dx] == 0) {
                            continue
                        }
                        matrix = safeboard.map(function (arr) {
                            return arr.slice();
                        });
                        drawBoard()
                        return;
                    }
                    if (matrix[i][j] != 0) {
                        if (currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x - dx] == 0) {
                            continue
                        }
                        isMoveValid = false
                    }
                    matrix[i][j] = currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x - dx]
                }
            }
            currentPiece.x += dx
            currentPiece.y += dy
            if (!isMoveValid) {
                currentPiece.x -= dx
                currentPiece.y -= dy
                matrix = safeboard.map(function (arr) {
                    return arr.slice();
                });
            }
            drawBoard()
            break;
        default:
            for (let i = currentPiece.y; i < currentPiece.y + 3; i++) {
                for (let j = currentPiece.x; j < currentPiece.x + 3; j++) {
                    if (currentPiece.pieceArr[i - currentPiece.y][j - currentPiece.x] != 0) {
                        matrix[i][j] = 0
                    }
                }
            }
            if (isClear) {
                drawBoard()
                return;
            }
            //simulate next position
            for (let i = currentPiece.y + dy; i < currentPiece.y + dy + 3; i++) {
                for (let j = currentPiece.x + dx; j < currentPiece.x + dx + 3; j++) {
                    if (i > 19) {
                        if (currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x - dx] == 0) {
                            continue
                        }
                        matrix = safeboard.map(function (arr) {
                            return arr.slice();
                        });
                        drawBoard()
                        return;
                    }
                    if (matrix[i][j] != 0) {
                        if (currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x - dx] == 0) {
                            continue
                        }
                        isMoveValid = false
                    }
                    matrix[i][j] = currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x - dx]
                }
            }
            currentPiece.x += dx
            currentPiece.y += dy
            if (!isMoveValid) {
                currentPiece.x -= dx
                currentPiece.y -= dy
                matrix = safeboard.map(function (arr) {
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

function rotate(direction) {
    if (currentPiece.pieceID == "O") {
        return
    }
    let isTurnValid = true
    let safeboard = matrix.map(function (arr) {
        return arr.slice();
    });
    let nextRot = currentPiece.pieceArr[0].map((val, index) => currentPiece.pieceArr.map(row => row[index]).reverse())
    if (direction == 1) {
        nextRot = currentPiece.pieceArr[0].map((val, index) => currentPiece.pieceArr.map(row => row[row.length - 1 - index]))
    }
    if (direction == 2) {
        nextRot = currentPiece.pieceArr.map(function (arr) {
            return arr.slice();
        });
        nextRot.reverse().forEach(function (item) { item.reverse(); });
    }
    
            for (let i = currentPiece.y; i < currentPiece.y + currentPiece.pieceArr.length; i++) {
                for (let j = currentPiece.x; j < currentPiece.x + currentPiece.pieceArr.length; j++) {
                    if (currentPiece.pieceArr[i - currentPiece.y][j - currentPiece.x] != 0) {
                        matrix[i][j] = 0
                    }
                }
            }
            let rotSimBoard = matrix.map(function (arr) {
                return arr.slice();
            });
            //sim
            for (let offset = 0; offset < defaultKick.length; offset++) {
                isTurnValid = true
                let startRot = currentPiece.rotation
                let endRot = currentPiece.rotation + 1
                if(direction == 1)
                {
                 endRot = currentPiece.rotation -1    
                }
                if(endRot == 4)
                {
                    endRot = 0
                }
                if(endRot == -1)
                {
                    endRot = 3
                }
                let dx = defaultKick[offset][startRot][0] - defaultKick[offset][endRot][0]
                let dy = defaultKick[offset][startRot][1] - defaultKick[offset][endRot][1]
                
                for (let i = currentPiece.y+dy; i < currentPiece.y+dy + currentPiece.pieceArr.length; i++) {
                    for (let j = currentPiece.x+dx; j < currentPiece.x+dx + currentPiece.pieceArr.length; j++) {
                        if(i > 19 || j > 9)
                        {
                            isTurnValid = false
                            continue
                        }
                            if (matrix[i][j] != 0) {
                                if (nextRot[i - currentPiece.y-dy][j - currentPiece.x-dx] == 0) {
                                    continue
                                }
                                isTurnValid = false
                            }
                            //console.log(nextRot[i - currentPiece.y-dy][j - currentPiece.x-dx])
                            matrix[i][j] = nextRot[i - currentPiece.y-dy][j - currentPiece.x-dx]
                            
                        
                    }
                }
                if (!isTurnValid) {
                    matrix = rotSimBoard.map(function (arr) {
                        return arr.slice();
                    });
                }
                else {
                    //console.log(matrix)
                    currentPiece.x += dx
                    currentPiece.y += dy
                    currentPiece.pieceArr = nextRot.map(function (arr) {
                        return arr.slice();
                    });
                    switch (direction) {
                        case 0:
                            currentPiece.rotation = (currentPiece.rotation + 1) % 4;
                            break;
    
                        case 1:
                            currentPiece.rotation = (currentPiece.rotation + 3) % 4;
                            break;
    
                        case 2:
                            currentPiece.rotation = (currentPiece.rotation + 2) % 4;
                            break;
                    }
                    drawBoard()
                    return;
                }
            }
            matrix = safeboard.map(function (arr) {
                return arr.slice();
            });
            drawBoard()
}

function holdPiece() {
    if (!currentHold) {
        currentHold = currentBag[0]
        nextPiece()
    }
    else {
        let temp = currentBag[0]
        currentBag[0] = currentHold
        currentHold = temp
        currentHold = currentPiece.pieceID
        spawnPiece(currentBag[0])
    }
    drawHold()
}

function checkLines() {
    let removeRows = []
    let zeroCount
    for (let y = 0; y < 20; y++) {
        zeroCount = 0
        for (let x = 0; x < 10; x++) {
            if (matrix[y][x] == 0) {
                zeroCount++;
            }
        }
        if (zeroCount == 0) {
            removeRows.push(y)
        }
    }
    for (let i = 0; i < removeRows.length; i++) {
        matrix.splice(removeRows[i], 1)
        matrix.unshift(new Array(10).fill(0))
    }
    drawBoard()
}


window.setInterval(function(){
    pieceMove(true,0,1)
    pieceMove(false,0,1)
},500)



spawnPiece(currentBag[0])