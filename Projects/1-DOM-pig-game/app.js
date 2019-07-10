//Declare Variables
var scores, roundScore, activePlayer;

//Initialize Start of Game
initializeGame();

//Roll Dice Button
document.querySelector(".btn-roll").addEventListener("click", function() {
  //1. Generate New Random Number, Range: [1,6]
  var dice = Math.floor(Math.random() * 6) + 1;

  //2. Display New Result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  //3. Add To Round Score If Dice is Not One
  if (dice !== 1) {
    roundScore += dice;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }

});

//Hold Button
document.querySelector(".btn-hold").addEventListener("click", function() {
  //1. Add Round Score To Total Score
  scores[activePlayer] += roundScore;

  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  //2. Check If Player Has 100 Points or More
  if (scores[activePlayer] >= 100) {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
  } else {
    //Next Player
    nextPlayer();
  }
});

//New Game Button
document.querySelector(".btn-new").addEventListener("click", initializeGame);

//Rules Button
document.querySelector(".btn-rules").addEventListener("click", function() {
alert(
    "GAME RULES\nEach turn, a player repeatedly rolls a dice until either a 1 is rolled or the player decides to hold:\n1) If the player rolls a 1, they score nothing and it becomes the next player's turn.\n2) If the player rolls any other number, it is added to their turn total and the player's turn continues.\n3) If a player chooses to hold, their turn total is added to their score, and it becomes the next player's turn.\n\nThe first player to score 100 or more points wins."
  );
});

function initializeGame() {
  //1. Reset Scores
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  //2. Initialize Game
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //3. Change Active Player GUI
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  //4. Unhide Roll and Hold Buttons
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";

  //5. Reset Player Names
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
}

function nextPlayer() {
  //1. Reset Score For Current Player
  document.getElementById("current-" + activePlayer).textContent = 0;

  //2. Remove As Active Player in GUI
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

  //3. Reset Round Score For Next Player
  roundScore = 0;

  //4. Change Active Player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //5. Hide Dice
  document.querySelector(".dice").style.display = "none";

  //6. Add New Player As Active Player in GUI
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
}
