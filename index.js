
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

    const dropToken = (player, column, row) => {

        board[row][column].addToken(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return {getBoard, dropToken,  printBoard};
}

function Cell() {
    let value = "0";


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
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printnewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (column, row) => {
        board.dropToken(activePlayer.getSymbol(), column, row);
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}...`);



        let currentPlayerToken = getActivePlayer().getSymbol();

        // 3 vertical
         for (let i = 0; i < 3; i ++) // i = boards rows
        {
            let counter = 0;


            for (let j = 0; j < 3; j++) {
                if (board.getBoard()[i][j].getValue() === currentPlayerToken) {
                    counter++;
                }
            }
            if (counter === 3) {
                console.log(`${getActivePlayer().name} has won the game! Congratulations!`)
                return;
            }
        }

         // 3 horizontal

        for (let i = 0; i < 3; i++) {

            let counter = 0;

            for (let j = 0; j < 3; j++) {

                if (board.getBoard()[j][i].getValue() === currentPlayerToken) {
                    counter++;
                }
            }
            if (counter === 3) {
                console.log(`${getActivePlayer().name} has won the game! Congratulations!`)
                printnewRound();
                return;
            }
        }


        // Cross check, hardcoded because loops are unnecessary

        if ((board.getBoard()[0][0].getValue() && board.getBoard()[1][1].getValue() && board.getBoard()[2][2].getValue()) === currentPlayerToken) {
            console.log(`${getActivePlayer().name} has won the game! Congratulations!`)
            printnewRound();
            return;
        }

        if ((board.getBoard()[0][2].getValue() && board.getBoard()[1][1].getValue() && board.getBoard()[2][0].getValue()) === currentPlayerToken) {
            console.log(`${getActivePlayer().name} has won the game! Congratulations!`)
            printnewRound();
            return;
        }


        switchPlayerTurn();
        printnewRound()
    }

    printnewRound()

    return {playRound, getActivePlayer}

}

const game = gameController();
game.playRound(1, 2);
game.playRound(2,0);
game.playRound(1,1);
game.playRound(2,1);
game.playRound(2,2);
game.playRound(0,1);
game.playRound(0,0);






