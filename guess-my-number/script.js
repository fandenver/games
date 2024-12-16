'use strict';

const btnCheck = document.querySelector('.btn.check');
const btnReset = document.querySelector('.btn.again');
const number = document.querySelector('.number');
const scoreDOM = document.querySelector('.score');
const highScoreDOM = document.querySelector('.highscore');
const body = document.querySelector('body');
const inputValue = document.querySelector('.guess');
const messageDOM = document.querySelector('.message');
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = message => {
    messageDOM.textContent = message;
};

btnReset.addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage('Начать угадывать...');
    scoreDOM.textContent = String(score);
    number.textContent = '?';
    inputValue.value = '';
    body.style.backgroundColor = '#222';
    number.style.width = '15rem';
});

btnCheck.addEventListener('click', () => {
    const inputGuess = Number(inputValue.value);

    if (
        messageDOM.textContent !== '🎉 Верное число!' &&
        messageDOM.textContent !== '✨ Вы проиграли'
    ) {
        if (!inputGuess) {
            displayMessage('⛔ Не число!');
        } else if (inputGuess === secretNumber) {
            number.textContent = secretNumber;
            displayMessage('🎉 Верное число!');
            body.style.backgroundColor = '#60b347';
            number.style.width = '30rem';
            if (score > highScore) {
                highScore = score;
                highScoreDOM.textContent = highScore;
            }
        } else if (inputGuess !== secretNumber) {
            if (score > 1) {
                displayMessage(
                    inputGuess > secretNumber
                        ? '📈 Слишком большое'
                        : '📉 Слишком маленькое',
                );
                score--;
                scoreDOM.textContent = score;
            } else {
                scoreDOM.textContent = '0';
                displayMessage('✨ Вы проиграли');
            }
        }
    }
});
