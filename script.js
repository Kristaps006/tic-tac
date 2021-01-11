const statusDisplay = document.querySelector('.result');

let game = true;
let playerX = "X";
let state = ["", "", "", "", "", "", "", "", ""];

const winMes = () => `${playerX}won!`;
const drawMessages = () => `Draw!`;
const yourTurn = () => `${playerX}'s turn`;

statusDisplay.innerHTML = yourTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickCell));
document.querySelector('.button_restart').addEventListener('click', restartGame);

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function restartGame() {
    game = true;
    playerX = "X";
    state = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = yourTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}



function resultApprove() {
    let round1 = false;
    for (let i = 0; i <= 7; i++) {
        const whoWins = winningConditions[i];
        let a = state[whoWins[0]];
        let b = state[whoWins[1]];
        let c = state[whoWins[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            round1 = true;
            break
        }
    }

    if (round1) {
        statusDisplay.innerHTML = winMes();
        game = false;
        return;
    }

    let roundDraw = !state.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessages();
        game = false;
        return;
    }

    changePlayer();
}



function cellPress(click, cellIndex) {
    state[cellIndex] = playerX;
    click.innerHTML = playerX;
}

function changePlayer() {
    playerX = playerX === "X" ? "O" : "X";
    statusDisplay.innerHTML = yourTurn();
}



function clickCell(clickEvent) {
    const click = clickEvent.target;
    const cellIndex = parseInt(click.getAttribute('data-cell-index'));

    if (state[cellIndex] !== "" || !game) {
        return;
    }

    cellPress(click, cellIndex);
    resultApprove();
}








