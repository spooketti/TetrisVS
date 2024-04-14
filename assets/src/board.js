let board = document.getElementById("board")
let bCTX = board.getContext("2d")
//consider making the rows bigger or smaller for custom gamemodes like 4 wide
let rows = 10
let cols = 20
let matrix = new Array(cols).fill(0).map(() => new Array(rows).fill(0));

let colorTable =
{
    7:"#f0f000", //OIZTLJS
    6:"#00f0f0",
    5:"#f00000",
    4:"#a000f0",
    2:"#f0a000",
    1:"#0000f0",
    3:"#00f000"
}

function initBoard() {
    bCTX.strokeStyle = "rgb(255,255,255)"
    for (let y = 0; y < 20; y++) {
        bCTX.beginPath();
        bCTX.moveTo(0, 24 * y);
        bCTX.lineTo(240, 24 * y)
        bCTX.stroke()
    }
    for (let x = 0; x < 20; x++) {
        bCTX.beginPath();
        bCTX.moveTo(24 * x, 0);
        bCTX.lineTo(24 * x, 480)
        bCTX.stroke()
    }
}

function drawBoard() {
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            bCTX.clearRect((x*24)+1,(y*24)+1,22,22)
            if (matrix[y][x] != 0) {
                bCTX.fillStyle = colorTable[matrix[y][x]]
                bCTX.fillRect((x*24)+1,(y*24)+1,22,22)
            }
        }
    }
}



initBoard()
drawBoard()