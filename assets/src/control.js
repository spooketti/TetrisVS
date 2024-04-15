document.addEventListener("keydown",function(e)
{
    switch(e.code)
    {
        
        case "ArrowRight":
            pieceMove(1,0)
        break;

        case "ArrowDown":
            pieceMove(0,1)
        break;

        case "ArrowLeft":
            pieceMove(-1,0)
        break;

        case "ArrowUp":
        rotate(0)
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
        pieceMove()
        holdPiece()
        break;

        case "KeyA":
        rotate(2)
        break;

    }
})