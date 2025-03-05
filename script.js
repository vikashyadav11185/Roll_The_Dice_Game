// Game State Variables
let currentPlayer = 1;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let player1SavedScore = 0;
let player2SavedScore = 0;
let gameOver = false;

// DOM Elements
const dice = document.getElementById("dice");
const rollBtn = document.getElementById("roll-btn");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const player1Element = document.getElementById("player1");
const player2Element = document.getElementById("player2");
const player1CurrentScoreEl = document.getElementById("player1-current-score");
const player2CurrentScoreEl = document.getElementById("player2-current-score");
const player1SavedScoreEl = document.getElementById("player1-saved-score");
const player2SavedScoreEl = document.getElementById("player2-saved-score");
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const player1Winner = document.getElementById("player1-winner");
const player2Winner = document.getElementById("player2-winner");

// Roll Dice Function
function rollDice() {
  if (gameOver) return;

  const diceRoll = Math.floor(Math.random() * 6) + 1;
  dice.textContent = diceRoll;

  if (diceRoll === 1) {
    // Reset current score and switch player
    if (currentPlayer === 1) {
      player1CurrentScore = 0;
      player1CurrentScoreEl.textContent = "0";
    } else {
      player2CurrentScore = 0;
      player2CurrentScoreEl.textContent = "0";
    }
    switchPlayer();
  } else {
    // Add dice roll to current score
    if (currentPlayer === 1) {
      player1CurrentScore += diceRoll;
      player1CurrentScoreEl.textContent = player1CurrentScore;
    } else {
      player2CurrentScore += diceRoll;
      player2CurrentScoreEl.textContent = player2CurrentScore;
    }
  }
}

// Save Score Function
function saveScore() {
  if (gameOver) return;

  if (currentPlayer === 1) {
    player1SavedScore += player1CurrentScore;
    player1SavedScoreEl.textContent = player1SavedScore;
    player1CurrentScore = 0;
    player1CurrentScoreEl.textContent = "0";

    // Check for win condition
    if (player1SavedScore >= 100) {
      endGame(1);
      return;
    }
  } else {
    player2SavedScore += player2CurrentScore;
    player2SavedScoreEl.textContent = player2SavedScore;
    player2CurrentScore = 0;
    player2CurrentScoreEl.textContent = "0";

    // Check for win condition
    if (player2SavedScore >= 100) {
      endGame(2);
      return;
    }
  }
  switchPlayer();
}

// Switch Player Function
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  player1Element.classList.toggle("active");
  player2Element.classList.toggle("active");
}

// End Game Function
function endGame(winningPlayer) {
  gameOver = true;
  rollBtn.disabled = true;
  saveBtn.disabled = true;

  if (winningPlayer === 1) {
    player1Winner.style.display = "block";
    player1Winner.textContent = `${player1NameInput.value} Wins!`;
  } else {
    player2Winner.style.display = "block";
    player2Winner.textContent = `${player2NameInput.value} Wins!`;
  }
}

// Reset Game Function
function resetGame() {
  currentPlayer = 1;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  player1SavedScore = 0;
  player2SavedScore = 0;
  gameOver = false;

  dice.textContent = "0";
  player1CurrentScoreEl.textContent = "0";
  player2CurrentScoreEl.textContent = "0";
  player1SavedScoreEl.textContent = "0";
  player2SavedScoreEl.textContent = "0";

  player1NameInput.value = "Player 1";
  player2NameInput.value = "Player 2";

  rollBtn.disabled = false;
  saveBtn.disabled = false;

  player1Winner.style.display = "none";
  player2Winner.style.display = "none";

  player1Element.classList.add("active");
  player2Element.classList.remove("active");
}

// Event Listeners
rollBtn.addEventListener("click", rollDice);
saveBtn.addEventListener("click", saveScore);
resetBtn.addEventListener("click", resetGame);

// Initialize game
player1Element.classList.add("active");
