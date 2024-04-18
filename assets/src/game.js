const bag = ["T", "J", "O", "Z", "S", "L", "I"]
let currentBag = shuffle()
let nextBag = shuffle()
let currentPiece = new piece()
let hardDropPos = 0
let currentHold = null
let isHoldLocked = false
safeboard = matrix.map(function (arr) {
    return arr.slice();
});

function shuffle() {
    return bag.toSorted(() => Math.random() - 0.5);
};


function spawnPiece(piece) {
    drawQueue(currentBag.concat(nextBag).slice(1, 6))
    for (let i = 0; i < tableMap[piece].length; i++) {
        for (let j = 0; j < tableMap[piece].length; j++) {
            matrix[i][j + 3] = tableMap[piece][i][j]
        }
    }
    currentPiece.x = 3
    currentPiece.y = 0
    currentPiece.rotation = 0
    currentPiece.pieceID = piece
    currentPiece.pieceArr = tableMap[piece].map(function (arr) {
        return arr.slice();
    });
    drawBoard()
    findGhostPiece()
}



function nextPiece(firstHoldCondition) {
    isHoldLocked = false
    if(firstHoldCondition)
    {
        isHoldLocked = true
    }
    currentBag.shift()
    if (currentBag.length <= 0) {
        currentBag = [...nextBag]
        nextBag = shuffle()
    }
    drawHold(isHoldLocked)
    spawnPiece(currentBag[0])
}

function pieceMove(dx, dy) {
    safeboard = matrix.map(function (arr) {
        return arr.slice();
    });
    let isMoveValid = true;
    for (let i = currentPiece.y; i < currentPiece.y + currentPiece.pieceArr.length; i++) {
        for (let j = currentPiece.x; j < currentPiece.x + currentPiece.pieceArr.length; j++) {
            if (currentPiece.pieceArr[i - currentPiece.y][j - currentPiece.x] != 0) {
                matrix[i][j] = 0
            }
        }
    }
    //simulate next position
    for (let i = currentPiece.y + dy; i < currentPiece.y + dy + currentPiece.pieceArr.length; i++) {
        for (let j = currentPiece.x + dx; j < currentPiece.x + dx + currentPiece.pieceArr.length; j++) {
            if (i > 19) {
                if (currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x - dx] == 0) {
                    continue
                }
                matrix = safeboard.map(function (arr) {
                    return arr.slice();
                });
                drawBoard()
                findGhostPiece()
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
    findGhostPiece()
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
    let newRot
    let nextRot
    switch (direction) {
        case 0: //clockwise
            nextRot = currentPiece.pieceArr[0].map((val, index) => currentPiece.pieceArr.map(row => row[index]).reverse())
            newRot = (currentPiece.rotation + 1) % 4;
            break;

        case 1: //counter clockwise
            nextRot = currentPiece.pieceArr[0].map((val, index) => currentPiece.pieceArr.map(row => row[row.length - 1 - index]))
            newRot = (currentPiece.rotation + 3) % 4;
            break;

        case 2: //180
            nextRot = currentPiece.pieceArr.map(function (arr) {
                return arr.slice();
            });
            nextRot.reverse().forEach(function (item) { item.reverse(); });
            newRot = (currentPiece.rotation + 2) % 4;
            break;
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
        let inv = 1
        if (direction == 1) {
            endRot = currentPiece.rotation - 1
            inv = -1
        }
        if (direction == 2) {
            endRot = currentPiece.rotation + 2
        }

        // console.log(endRot)
        endRot = (endRot + 4) % 4;
        if (endRot == -1) {
            endRot = 3
        }
        if (endRot == 4) {
            endRot = 0
        }


        let dx = (defaultKick[offset][startRot][0] - defaultKick[offset][endRot][0])//*inv
        let dy = (defaultKick[offset][startRot][1] - defaultKick[offset][endRot][1])//*inv

        for (let i = currentPiece.y + dy; i < currentPiece.y + dy + currentPiece.pieceArr.length; i++) {
            for (let j = currentPiece.x + dx; j < currentPiece.x + dx + currentPiece.pieceArr.length; j++) {

                if (i > 19 || j > 9) {
                    if (nextRot[i - currentPiece.y - dy][j - currentPiece.x - dx] == 0) {
                        continue
                    }
                    isTurnValid = false
                    continue
                }
                if (matrix[i][j] != 0) {
                    if (nextRot[i - currentPiece.y - dy][j - currentPiece.x - dx] == 0) {
                        continue
                    }
                    isTurnValid = false
                }
                //console.log(nextRot[i - currentPiece.y-dy][j - currentPiece.x-dx])
                matrix[i][j] = nextRot[i - currentPiece.y - dy][j - currentPiece.x - dx]


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
            currentPiece.rotation = newRot
            currentPiece.rotation = (currentPiece.rotation + 4) % 4
            drawBoard()
            findGhostPiece()
            return;
        }
    }
    matrix = safeboard.map(function (arr) {
        return arr.slice();
    });
    drawBoard()
    findGhostPiece()
}

function holdPiece() {
    if (isHoldLocked) {
        return;
    }
    if (!currentHold) {
        isHoldLocked = true
        for (let y = currentPiece.y; y < currentPiece.y + currentPiece.pieceArr.length; y++) {
            for (let x = currentPiece.x; x < currentPiece.x + currentPiece.pieceArr.length; x++) {
                if (currentPiece.pieceArr[y - currentPiece.y][x - currentPiece.x] !=0) {
                    matrix[y][x] = 0
                }
            }
        }
        currentHold = currentBag[0]
        nextPiece(true)
        drawHold(isHoldLocked)
        return;
    }
    for (let y = currentPiece.y; y < currentPiece.y + currentPiece.pieceArr.length; y++) {
        for (let x = currentPiece.x; x < currentPiece.x + currentPiece.pieceArr.length; x++) {
            if (currentPiece.pieceArr[y - currentPiece.y][x - currentPiece.x]!=0) {
                
                matrix[y][x] = 0
            }
        }
    }
    isHoldLocked = true
    let temp = currentBag[0]
    currentBag[0] = currentHold
    currentHold = temp
    currentHold = currentPiece.pieceID
    spawnPiece(currentBag[0])
    drawHold(isHoldLocked)
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
    clearEffect(removeRows.length)
    drawBoard()
    findGhostPiece()
}

function findGhostPiece() {
    let matCopy = matrix.map(function (arr) {
        return arr.slice();
    });
    for (let i = currentPiece.y; i < currentPiece.y + currentPiece.pieceArr.length; i++) {
        for (let j = currentPiece.x; j < currentPiece.x + currentPiece.pieceArr.length; j++) {
            if (currentPiece.pieceArr[i - currentPiece.y][j - currentPiece.x] != 0) {
                matCopy[i][j] = 0
            }
        }
    }
    let reached = false

    let matSim = matCopy.map(function (arr) {
        return arr.slice();
    });

    let dy = 1
    let ybuffer = 0
    while (!reached) {
        matSim = matCopy.map(function (arr) {
            return arr.slice();
        });
        for (let i = currentPiece.y; i < currentPiece.y + currentPiece.pieceArr.length; i++) {
            for (let j = currentPiece.x; j < currentPiece.x + currentPiece.pieceArr.length; j++) {
                if (currentPiece.pieceArr[i - currentPiece.y][j - currentPiece.x] != 0) {
                    matSim[i][j] = 0
                }
            }
        }

        for (let i = currentPiece.y + dy; i < currentPiece.y + currentPiece.pieceArr.length + dy; i++) {
            for (let j = currentPiece.x; j < currentPiece.x + currentPiece.pieceArr.length; j++) {
                if (i > 19) {
                    if (currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x] == 0) {
                        continue
                    }
                    reached = true
                    ybuffer = 1
                    continue
                }
                if (matSim[i][j] != 0) {
                    if (currentPiece.pieceArr[i - currentPiece.y - dy][j - currentPiece.x] == 0) {
                        continue
                    }
                    reached = true
                }
            }
        }
        dy++
        matCopy = matSim.map(function (arr) {
            return arr.slice();
        });
        if (dy > 19) {
            reached = true
        }
    }
    dy -= 2
    hardDropPos = dy
    drawGhost(dy)
}

function hardDrop() {
    pieceMove(0, hardDropPos)
}

window.setInterval(function () {
    pieceMove(0, 1)
}, 500)




spawnPiece(currentBag[0])