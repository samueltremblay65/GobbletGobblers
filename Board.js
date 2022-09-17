class Board
{
    constructor(boardsize, player1, player2)
    {
        this.boardsize = boardsize;
        this.players = [player1, player2];
        this.gameState = -1;
        this.turnNumber = 0;
        this.pieces = new Array(boardsize).fill(null).map(()=>new Array(boardsize).fill(null));
    }

    turn(stackNumber, x, y)
    {
        // This occurs 
        if(stackNumber == 2)
        {
            const tile = this.pieces[x][y]
            console.log('Moving tile');
            if(!tile || tile.length == 0)
            {
                console.log("No piece on this tile");
                return;
            }
            if(tile[tile.length - 1].playerNum == this.turnNumber + 1)
            {
                buffer = tile.pop();
                selected[this.turnNumber] = 3;

            }
        }
        else if(stackNumber == 3)
        {            
            if(!buffer)
            {
                console.log("Buffer is empty");
            }
            else
            {
                const piece = buffer;
                if(piece.value > this.getPieceValue(x,y))
                {
                    if(this.pieces[x][y] == null)
                    {
                        this.pieces[x][y] = [piece];
                    }
                    else
                    {
                        this.pieces[x][y].push(piece);
                    }
                    buffer = null;
                    selected[this.turnNumber] = 2;

                    if(this.turnNumber == 1)
                    {
                        this.turnNumber = 0;
                    }
                    else
                    {
                        this.turnNumber = 1;
                    }
                }
                else
                {
                    console.log('Cannot push piece');
                }
            }
            console.log(this.checkWin());
        }
        else
        {
            if(this.players[this.turnNumber].pieces[stackNumber].length <= 0)
            {
                console.log("Stack is empty, please select from other stack");
            }
            else
            {
                const piece = this.players[this.turnNumber].takeGoblet(stackNumber);
                if(piece.value > this.getPieceValue(x, y))
                {
                    if(this.pieces[x][y] == null)
                    {
                        this.pieces[x][y] = [piece];
                    }
                    else
                    {
                        this.pieces[x][y].push(piece);
                    }
                    if(this.turnNumber == 1)
                    {
                        this.turnNumber = 0;
                    }
                    else
                    {
                        this.turnNumber = 1;
                    }
                }
                else
                {
                    console.log("Cannot push piece");
                    this.players[this.turnNumber].pieces[stackNumber].push(piece);
                }
            }
            console.log(this.checkWin());
        }

    }

    getPieceNumber(x, y)
    {
        const tmp = this.pieces[x][y];
        if(tmp == null || tmp.length == 0)
        {
            return 0;
        }
        return this.pieces[x][y][this.pieces[x][y].length - 1].playerNum;
    }

    getPieceValue(x, y)
    {
        const tmp = this.pieces[x][y];
        if(tmp == null || tmp.length == 0)
        {
            return 0;
        }
        else
        {
            return tmp[tmp.length - 1].value;
        }
    }

    checkWin()
    {
        const pieces = board.pieces;

        // Checking rows
        for(let i = 0; i < board.boardsize; i++)
        {
            let firstPieceNumber = this.getPieceNumber(i, 0);
            let flag = false;
            if(firstPieceNumber != 0)
            {
                flag = true;
                for(let j = 1; j < this.boardsize; j++)
                {
                    if(this.getPieceNumber(i, j) != firstPieceNumber)
                    {
                        flag = false;
                    }
                }
            }
            if(flag)
            {
                return true;
            }
        }

        // Checking columns
        for(let i = 0; i < this.boardsize; i++)
        {
            let firstPieceNumber = this.getPieceNumber(0, i);
            let flag = false;
            if(firstPieceNumber != 0)
            {
                flag = true;
                for(let j = 1; j < this.boardsize; j++)
                {
                    if(this.getPieceNumber(j, i) != firstPieceNumber)
                    {
                        flag = false;
                    }
                }
            }
            if(flag)
            {
                return true;
            }
        }

        // Checking diagonals

        // Change if board size changes

        if(this.getPieceNumber(0,0) == this.getPieceNumber(1,1) && this.getPieceNumber(2,2) == this.getPieceNumber(3,3) && this.getPieceNumber(0,0) == this.getPieceNumber(3,3) && this.getPieceNumber(0,0) != 0)
        {
            return true;
        }

        if(this.getPieceNumber(3,0) == this.getPieceNumber(2,1) && this.getPieceNumber(1,2) == this.getPieceNumber(0,3) && this.getPieceNumber(3,0) == this.getPieceNumber(0,3) && this.getPieceNumber(0,3) != 0)
        {
            return true;
        }
        return false;
    }
}