class Player{

    constructor(name, number, color)
    {
        this.name = name;
        this.number = number;
        this.color = color;

        this.pieces = [[], []];
        for(let i = 0; i < 2; i++)
        {
            for(let j = 0; j < 4; j++)
            {
                this.pieces[i][j] = new Piece(this.number, j+1);
            }
        }
    }

    takeGoblet(stackNumber)
    {
        const piece = this.pieces[stackNumber].pop();
        return piece;
    }

    getTopPiece(stackNumber)
    {
        if(this.pieces[stackNumber][this.pieces[stackNumber].length - 1] == null)
        {
            return 0;
        }
        return this.pieces[stackNumber][this.pieces[stackNumber].length - 1].value;
    }

    getColor()
    {
        return this.color;
    }
}