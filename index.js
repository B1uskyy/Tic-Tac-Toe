
function createPlayer(name, symbol) {
    let playerName = name;
    let playerSymbol = symbol;

    const getSymbol = () => playerSymbol;

    return {name, symbol, getSymbol}
}


function Gameboard() {

    const rows = 3;
    const column = 3;
    const board = [];

    // 2d array to represent the gameboard
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (player, column) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

        if (!availableCells) return;

        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addToken(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return {getBoard, dropToken,  printBoard};
}

function Cell() {
    let value = 0;


    const addToken = (player) => {
        value = player;
    }


    const getValue = () => value;

    return {addToken, getValue};
}


function gameController() {

    const players = [createPlayer("Mats", "O"), createPlayer("Åse", "X")];
    const board = Gameboard();
    console.log(board);

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activeplayer = activeplayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activeplayer;

    const printnewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (column) => {
        board.dropToken(activePlayer.getSymbol(), column);
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}...`);

        // Check winner


        switchPlayerTurn();
        printnewRound()
    }

    printnewRound()

    return {playRound, getActivePlayer}

}



