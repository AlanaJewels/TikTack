const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');

let isPlayerOTurn = false; // Player O starts second
let scoreX = 0;
let scoreO = 0;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isPlayerOTurn = false; // Player X starts the game
  cellElements.forEach(cell => {
    cell.classList.remove(PLAYER_X_CLASS, PLAYER_O_CLASS);
    cell.removeEventListener('click', handleCellClick); // Remove old event listeners
    cell.addEventListener('click', handleCellClick, { once: true }); // Add new event listener
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isPlayerOTurn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false); // Game ends with a win
  } else if (isDraw()) {
    endGame(true); // Game ends with a draw
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    const winner = isPlayerOTurn ? "Player O" : "Player X";
    winningMessageTextElement.innerText = `${winner} wins!`;

    // Update score
    if (isPlayerOTurn) {
      scoreO++;
      scoreOElement.innerText = scoreO;
    } else {
      scoreX++;
      scoreXElement.innerText = scoreX;
    }
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => 
    cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
  );
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass); // This triggers the appearance of X or O via CSS
}

function swapTurns() {
  isPlayerOTurn = !isPlayerOTurn; // Switch player turns
}

function setBoardHoverClass() {
  if (isPlayerOTurn) {
    boardElement.classList.add(PLAYER_O_CLASS);
    boardElement.classList.remove(PLAYER_X_CLASS);
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
    boardElement.classList.remove(PLAYER_O_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
