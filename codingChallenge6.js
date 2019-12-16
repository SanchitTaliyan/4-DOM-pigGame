// pig-Game//////////////////////////////////////////

var scores, roundScore, activePlayer, prevDice1, prevDice2, gamePlaying;

init();

//Roll button
//Here we have used anonymous function(a funciton which has no name & hence can't be reused)
document.querySelector('.btn-roll').addEventListener('click', function() {

  if(gamePlaying) {
    //1. generate a random number
    var dice1 = Math.floor(Math.random() * 6) +1;
    var dice2 = Math.floor(Math.random() * 6) +1;

    //2. Display the result
    var diceDOM1 = document.getElementById('dice-1');
    var diceDOM2 = document.getElementById('dice-2');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    //document.getElementById('current-' + activePlayer).textContent = dice;


    //3. Update the round score IF rolled number was NOT a 1
    if((dice1 === 6 && prevDice1 === 6) || (dice2 === 6 && prevDice2 === 6)) {
      //current player looses all the scores
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      changePlayer();
    }else if(dice1 !== 1 && dice2 != 1) {
      //Add Score
      roundScore += dice1 + dice2;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    }else {
      //Update the UI and Player
      changePlayer();
    }
    prevDice1 = dice1;
    prevDice2 = dice2;
  }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //variable to store the final score
    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, Null, and "" are COERCED to false
    //Anything else is COERCED to true
    if(input) {
      winningScore = input;
    }else {
      winningScore = 100;
    }

    //check If player won the game
    if(scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      roundScore = 0;
      gamePlaying = false;
    }


    //change UI and Player
    else
      changePlayer();
  }
});

//function to change Current player
function changePlayer () {
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = roundScore;
  //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  activePlayer = activePlayer === 1 ? 0 : 1;
  //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

// here init is a call back function bcz this is a function not called by us but by another function
document.querySelector('.btn-new').addEventListener('click', init);

//game Initialization function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 0';
  document.getElementById('name-1').textContent = 'Player 1';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
