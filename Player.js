class Player{

    constructor(name, number)
    {
        this.name = name;
        this.number = number;
        this.color = 'red';

        if(this.name == 'Sam')
        {
            this.color = 'pink';
        }
        else if(this.name == 'Elyse')
        {
            this.color = 'lime';
        }

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

    getColor()
    {
        return this.color;
    }
}