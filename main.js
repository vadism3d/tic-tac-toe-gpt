const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const newGameBtn = document.querySelector('.new-game-btn');

let currentPlayer = 'X';
let isGameOver = false;
let winner = null;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  
  if (isGameOver || cell.textContent !== '') {
    return;
  }
  
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);
  
  checkWin();
  
  if (!isGameOver) {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    
    if (
      cells[a].textContent !== '' &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      winner = currentPlayer;
      isGameOver = true;
      message.textContent = `${winner} wins!`;
      
      for (let j = 0; j < winningCombos[i].length; j++) {
        const index = winningCombos[i][j];
        cells[index].classList.add('winner');
      }
      
      break;
    }
  }
  
  if (!winner && [...cells].every(cell => cell.textContent !== '')) {
    isGameOver = true;
    message.textContent = "It's a tie!";
  }
}

function startNewGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'winner');
  });
  
  isGameOver = false;
  winner = null;
  currentPlayer = 'X';
  message.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameBtn.addEventListener('click', startNewGame);

message.textContent = `It's ${currentPlayer}'s turn`;
