'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const message = document.querySelector('.message');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnPlay = document.querySelector('.btn--play');
const btnClose = document.querySelector('.close-modal');
const instruction = document.querySelector('.instruction');
const overlay = document.querySelector('.overlay');

//Starting conditions
let scoresPlayer, playing, currentScore, activePlayer;

const openModal = () => {
  instruction.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = () => {
  instruction.classList.add('hidden');
  overlay.classList.add('hidden');
};
const reset = () => {
  scoresPlayer = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  message.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};
reset();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Reading the Instructions of the game
btnPlay.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !instruction.classList.contains('hidden')) {
    closeModal();
  }
});

//Reseting the Game
btnNew.addEventListener('click', reset);

//Implementing Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');

    // Display dice
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    //check for rolled 1 : if true switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // change later to dis
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1 Add current score to active player's score
    scoresPlayer[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scoresPlayer[activePlayer];

    //2. Check if players score is >=100
    if (scoresPlayer[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      message.innerHTML = `Game over!!!
      player ${activePlayer === 0 ? 1 : 2 || activePlayer === 1 ? 2 : 1} wins`;
      message.classList.remove('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
    // Finish the game if condition 2 is true
  }
});
