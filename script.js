let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'multiplayer'; 

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

const statusDisplay = document.getElementById('game-status');

function setMode(mode) {
    gameMode = mode;
    resetGame();
    statusDisplay.innerHTML = `Current Mode: ${mode === 'computer' ? 'Playing with Computer' : 'Multiplayer'}`;
}

function handleClick(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].innerText = currentPlayer;
    checkResult();

    if (gameActive) {
        if (gameMode === 'computer' && currentPlayer === 'X') {
      
            currentPlayer = 'O';
            setTimeout(() => computerMove(), 500);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function computerMove() {
    const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        document.querySelectorAll('.cell')[randomIndex].innerText = 'O';
        checkResult();

     
        if (gameActive) {
            currentPlayer = 'X';
        }
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        document.getElementById('restart').style.display = 'block';
        return;
    }

    const roundDraw = !board.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = 'Game Draw!';
        gameActive = false;
        document.getElementById('restart').style.display = 'block';
        return;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => (cell.innerText = ''));
    statusDisplay.innerHTML = '';
    document.getElementById('restart').style.display = 'none';
}
