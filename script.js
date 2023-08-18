'use strict';
// selecting elements
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing, activePlayer, currentScore, score;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init()

//switch next player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//if roll btn is clicked

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generateeing  random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check is it 1 or not
    if (dice !== 1) {
      // add  dice to current number
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch the next player
      switchPlayer();
    }
  }
});

//use btnHold
btnHold.addEventListener('click', function () {
  if (playing) {
    // add score to current player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check score atlest 100 or not
    if (score[activePlayer] >=20) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //if no switch the player
      switchPlayer();
    }
  }
});

//use new btn

btnNew.addEventListener('click', function () {
  init();
});
