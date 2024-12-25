// DOM Elements
const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const strikeLine = document.getElementById('strikeLine');
const gameModeSelect = document.getElementById('gameMode');

// State Variables
let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = true;
let isAIEnabled = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize game
function initGame() {
    gameBoard.innerHTML = '';
    strikeLine.style.transform = 'scaleX(0)';
    board.fill('');
    isGameActive = true;
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;

    // Set game mode
    isAIEnabled = gameModeSelect.value === 'computer';

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    // Ignore clicks if cell is taken or game is over
    if (board[cellIndex] !== '' || !isGameActive) return;

    // Update board state
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        handleWin();
    } else if (board.every(cell => cell !== '')) {
        handleTie();
    } else {
        // Switch player or let AI play
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;

        if (isAIEnabled && currentPlayer === 'O') {
            setTimeout(aiPlay, 700); 
        }
    }
}

// Check for a winner
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c]) {
            drawStrikeLine(combination);
            return true;
        }
        return false;
    });
}

// Handle a win
function handleWin() {
    message.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
}

// Handle a tie
function handleTie() {
    message.textContent = `It's a tie!`;
    isGameActive = false;
}

// Restart game
restartButton.addEventListener('click', initGame);


// AI Logic
function aiPlay() {
    const emptyCells = board.map((value, index) => (value === '' ? index : null)).filter(value => value !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cell = gameBoard.children[randomIndex];
    cell.click(); 
}

// Initialize game
initGame();