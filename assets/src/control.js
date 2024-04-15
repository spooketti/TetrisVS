document.addEventListener("keydown",function(e)
{
    switch(e.code)
    {
        
        case "ArrowRight":
            pieceMove(true,1,0)
            pieceMove(false,1,0)
        break;

        case "ArrowDown":
            pieceMove(true,0,1)
            pieceMove(false,0,1)
        break;

        case "ArrowLeft":
            pieceMove(true,-1,0)
            pieceMove(false,-1,0)
        break;

        case "ArrowUp":
        //pieceMove(true,0,0)
        rotate(0)
        //pieceMove(false,0,0)
        break;

        case "KeyZ":
        rotate(1)
        break;

        case "Space":
        checkLines()
        nextPiece()
        spawnPiece(currentBag[0])
        break;

        case "KeyC":
        pieceMove(true)
        holdPiece()
        break;

        case "KeyA":
        rotate(2)
        break;

    }
})