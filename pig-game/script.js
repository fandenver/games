'use strict';

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const scorePlayer1El = document.querySelector('#score--0');
const scorePlayer2El = document.querySelector('#score--1');
const currentScorePlayer1El = document.querySelector('#current--0');
const currentScorePlayer2El = document.querySelector('#current--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scorePlayer1El.textContent = '0';
    scorePlayer2El.textContent = '0';
    currentScorePlayer1El.textContent = '0';
    currentScorePlayer2El.textContent = '0';

    diceEl.classList.add('hidden');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');
    player1El.classList.add('player--active');
    player2El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            `${scores[activePlayer]}`;

        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNewGame.addEventListener('click', init);
