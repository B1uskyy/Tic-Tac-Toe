
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
    let validMove;

    // 2d array to represent the gameboard
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (player, column, row) => {

        if (board[row][column].getValue() !== "") {
            validMove = false
            return
        }
        board[row][column].addToken(player);
        validMove = true;
    };

    const getValidMove = () => validMove;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }



    return {getBoard, dropToken,  printBoard,getValidMove};
}

function Cell() {
    let value = "";


    const addToken = (player) => {
        value = player;
    }


    const getValue = () => value;
    const setValue = (newValue) => value = newValue;

    return {addToken, getValue, setValue};
}


function gameController() {

    const players = [createPlayer("Mats", "O"), createPlayer("Åse", "X")];
    const board = Gameboard();
    let hasWon = false;
    console.log(board);

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const getHasWon = () => hasWon;
    const setHasWon = (value) => hasWon = value;


    const printnewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getSymbol()}'s turn.`)
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
                hasWon = true;
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
                hasWon = true;
                printnewRound();
                return;
            }
        }


        // Cross check, hardcoded because loops are unnecessary

        if ((board.getBoard()[0][0].getValue() && board.getBoard()[1][1].getValue() && board.getBoard()[2][2].getValue()) === currentPlayerToken) {
            hasWon = true;
            printnewRound();
            return;
        }

        if ((board.getBoard()[0][2].getValue() && board.getBoard()[1][1].getValue() && board.getBoard()[2][0].getValue()) === currentPlayerToken) {
            hasWon = true;
            printnewRound();
            return;
        }



        if (board.getValidMove() === true) {
            switchPlayerTurn();
        }

        printnewRound()
    }



    printnewRound()

    return {playRound, getActivePlayer,getHasWon,setHasWon, getBoard: board.getBoard()}

}


function ScreenControler() {
    const game = gameController();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const restartButton = document.querySelector(".restart")


    const updateScreen = () =>  {
        boardDiv.textContent = "";
        const board = game.getBoard;
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.getSymbol()}'s turn...`


        if (game.getHasWon()) {
            playerTurnDiv.textContent = `${activePlayer.getSymbol()} has won!`
        }

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.column = columnIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })

    }

    function restartHandler() {
        const board = game.getBoard;

        board.forEach((row) => {
            row.forEach(cell => {
                console.log(cell.setValue(""))
            })
        })

        let activePlayer = game.getActivePlayer();
        game.setHasWon(false);


        updateScreen()
    }

    restartButton.addEventListener("click",restartHandler);

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedColumn) return;

        game.playRound(selectedColumn, selectedRow);
        updateScreen()
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();

}



ScreenControler()





