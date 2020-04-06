// pig-Game//////////////////////////////////////////

var scores, roundScore, activePlayer, gamePlaying;

init();

//Roll button
//Here we have used anonymous function(a function which has no name & hence can't be reused)
document.querySelector('.btn-roll').addEventListener('click', function() {

  if(gamePlaying) {
    //1. generate a random number
    var dice = Math.floor(Math.random() * 6) +1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //document.getElementById('current-' + activePlayer).textContent = dice;


    //3. Update the round score IF rolled number was NOT a 1
    if(dice !== 1) {
      //Add Score
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    else {
      //Update the UI and Player
      changePlayer();
    }
  }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //check If player WON the game
    if(scores[activePlayer] >= 20) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
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
  document.querySelector('.dice').style.display = 'none';
}

// here init is a call back function bcz this is a function not called by us but by another function
document.querySelector('.btn-new').addEventListener('click', init);

//game Initialization function
function init() {
  scores = [0, 0];
  roundScore = 5;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
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

  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>'; 
}
