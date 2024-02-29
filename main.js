let canvas = document.getElementById("game_canvas");
let ctx = canvas.getContext("2d");

// Game setup

const player1 = new Player('Player 1', 1, "#d457a0");
const player2 = new Player('Player 2', 2, "#abeb34");

const BOARD_SIZE = 4;
const board = new Board(BOARD_SIZE, player1, player2);

// Constants
const DARK_BLUE = '#3262a8';
const LIGHT_BLUE = '#6587ba';

const CANVAS_TILE = canvas.height / board.boardsize;
const CANVAS_HEIGHT = canvas.height / CANVAS_TILE;
const CANVAS_WIDTH = canvas.width / CANVAS_TILE;

// DOM constants
const stack_buttons = [[document.getElementById('stack_p1_1'), document.getElementById('stack_p1_2'), document.getElementById('stack_p1_move')], [document.getElementById('stack_p2_1'),  document.getElementById('stack_p2_2'), document.getElementById('stack_p2_move')]];
const turn_control = document.getElementById("turn_control");

let selected = [0, 0];
let buffer;

let currentHoverTile = null;

setup();

function changeSelected(playerNum, selection)
{
    selected[playerNum] = selection;

    // Change visible selection indicators
    stack_buttons[playerNum].forEach(element => {
        element.style.transform = '';
    });
    stack_buttons[playerNum][selection].style.transform = 'scale(1.2)';
}

function changeSelected(playerNum, selection)
{
    selected[playerNum] = selection;

    // Change visible selection indicators
    stack_buttons[playerNum].forEach(element => {
        element.style.transform = '';
    });
    stack_buttons[playerNum][selection].style.transform = 'scale(1.2)';
}

// Adding onclick listeners for the stack buttons
stack_buttons[0][0].addEventListener('click', function(){changeSelected(0, 0);});
stack_buttons[0][1].addEventListener('click', function(){changeSelected(0, 1);});
stack_buttons[0][2].addEventListener('click', function(){changeSelected(0, 2);});
stack_buttons[1][0].addEventListener('click', function(){changeSelected(1, 0);});
stack_buttons[1][1].addEventListener('click', function(){changeSelected(1, 1);});
stack_buttons[1][2].addEventListener('click', function(){changeSelected(1, 2);});


// Change initial selection of stacks
changeSelected(0, 0);
changeSelected(1, 0);

// Add preview for next tile
document.addEventListener("mousemove", (event) => {
    
    const currentTile = getClickedTile(event);

    if(isOnBoard(currentTile))
    {
        if(currentHoverTile == null || !(currentTile.x == currentHoverTile.x && currentTile.y == currentHoverTile.y))
        {
            currentHoverTile = currentTile;
            
            // Show preview indicator
            const player = board.players[board.turnNumber];
            const color = player.color;
            const stack = selected[board.turnNumber];
            const value = player.getTopPiece(stack);

            drawBoard();
            drawPreviewTile(currentHoverTile.x, currentHoverTile.y, color, value);
        }
    }
    else
    {
        drawBoard();
        currentHoverTile = null;
    }
});


// Utility functions 

// Drawing background
function drawBackground()
{
    let color_bool = 0;
    for(let i = 0; i < CANVAS_WIDTH; i++)
    {
        for(let j = 0; j < CANVAS_HEIGHT; j++)
        {
            if(color_bool)
            {
                drawBackgroundTile(DARK_BLUE, i, j);
            }
            else
            {
                drawBackgroundTile(LIGHT_BLUE, i, j);
            }
            color_bool = !color_bool;
        }
        color_bool = !color_bool;
    }
}

// Drawing tile
function drawBackgroundTile(color, x, y)
{
    ctx.fillStyle = color;
    ctx.fillRect(x * CANVAS_TILE, y * CANVAS_TILE, CANVAS_TILE, CANVAS_TILE);
}

function getMousePosition(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x: x, y: y};
}

function isOnBoard(tile)
{
    if(tile.x < 0 || tile.x >= BOARD_SIZE)
    {
        return false;
    }

    if(tile.y < 0 || tile.y >= BOARD_SIZE)
    {
        return false;
    }

    return true;
}


// get clicked tile
function getClickedTile(event)
{     
    let position = getMousePosition(event);
    return {x: Math.floor(position.x / CANVAS_TILE), y: Math.floor(position.y / CANVAS_TILE)};
}

// Click listener in charge of turns
canvas.addEventListener('click', function(e){
    const tile = getClickedTile(e);

    if(isOnBoard(tile))
    {
        // If game is still playing
        if(board.gameState == -1)
        {
            turn(selected[board.turnNumber], tile.x, tile.y);
        }
        drawBoard();
    }
});

function drawRectTile(x, y, color, size)
{
    ctx.fillStyle = color;
    if(size == 1)
    {
        ctx.fillRect(x * CANVAS_TILE + 3 * CANVAS_TILE / 8, y * CANVAS_TILE + 3 * CANVAS_TILE / 8, CANVAS_TILE / 4, CANVAS_TILE / 4);
    }
    else if (size == 2)
    {
        ctx.fillRect(x * CANVAS_TILE + CANVAS_TILE / 4, y * CANVAS_TILE + CANVAS_TILE / 4, CANVAS_TILE / 2, CANVAS_TILE/2);
    }
    else if (size == 3)
    {
        ctx.fillRect(x * CANVAS_TILE + CANVAS_TILE / 8, y * CANVAS_TILE + CANVAS_TILE / 8, 3 * CANVAS_TILE / 4, 3 * CANVAS_TILE / 4);
    }
    else if (size == 4)
    {
        ctx.fillRect(x * CANVAS_TILE, y * CANVAS_TILE, CANVAS_TILE, CANVAS_TILE);
    }
}

function drawPreviewTile(x, y, color, size)
{
    ctx.fillStyle = color;
    if(size == 1)
    {
        ctx.fillRect(x * CANVAS_TILE + 3 * CANVAS_TILE / 8, y * CANVAS_TILE + 3 * CANVAS_TILE / 8, CANVAS_TILE / 4, CANVAS_TILE / 4);
    }
    else if (size == 2)
    {
        ctx.fillRect(x * CANVAS_TILE + CANVAS_TILE / 4, y * CANVAS_TILE + CANVAS_TILE / 4, CANVAS_TILE / 2, CANVAS_TILE/2);
    }
    else if (size == 3)
    {
        ctx.fillRect(x * CANVAS_TILE + CANVAS_TILE / 8, y * CANVAS_TILE + CANVAS_TILE / 8, 3 * CANVAS_TILE / 4, 3 * CANVAS_TILE / 4);
    }
    else if (size == 4)
    {
        ctx.fillRect(x * CANVAS_TILE, y * CANVAS_TILE, CANVAS_TILE, CANVAS_TILE);
    }
}

function drawBoardPieces()
{
    for(let i = 0; i < CANVAS_WIDTH; i++)
    {
        for(let j = 0; j < CANVAS_HEIGHT; j++)
        {
            const tmp = board.pieces[i][j];
            if(tmp && tmp.length > 0)
            {
                const color = board.players[tmp[tmp.length - 1].playerNum - 1].color;
                drawRectTile(i, j, color, tmp[tmp.length - 1].value);
            }
        }
    }
}

function drawBoard()
{
    drawBackground();
    drawBoardPieces();
}

function turn(stackNumber, x, y)
{
    board.turn(stackNumber, x, y);
    if(board.gameState!=-1)
    {
        console.log("Game over!");
        turn_control.innerHTML = "Player " + board.gameState + " wins";
    }
}

function updateStackButtons()
{
    stack_buttons[0][0].innerHTML = "top piece : " + player1.getTopPiece(0);
    stack_buttons[0][1].innerHTML = "top piece : " + player1.getTopPiece(1);
    stack_buttons[1][0].innerHTML = "top piece : " + player2.getTopPiece(0);
    stack_buttons[1][1].innerHTML = "top piece : " + player2.getTopPiece(1);
}

function setup()
{
    drawBoard()
    updateStackButtons();
}

function updateTurnControl()
{
    if(board.turnNumber == 0)
    {
        turn_control.innerHTML = player1.name + "'s turn";
    }
    else
    {
        turn_control.innerHTML = player2.name + "'s turn";
    }
}
