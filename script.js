const testWord = document.querySelector('.word');
const correctWords = document.querySelector('.correct-count');
const wrongWords = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
const timerDiv = document.querySelector('#timer');

const words = [
    'language',
    'apple',
    'bear',
    'capability',
    'desire',
    'earphones',
    'queue',
    'development',
    'disinterested',
    'lieutenant',
    'pronunciation'
];

let randomWord = '';
let index = 0;
let countCorrectWords = 0;
let countWrongWords = 0;
let countWordMistakes = 0;
let timerId;
let isTraining = false;

let time = timerDiv.textContent.split(':');
let minutes = time[0];
let seconds = time[1];

document.addEventListener('keydown', checkWord);

function generateWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function insertWord() {
    testWord.innerHTML = '';
    wordMistakes.textContent = 0;
    countWordMistakes = 0;
    index = 0;

    randomWord = generateWord();
    const elements = randomWord.split('');

    const fragment = document.createDocumentFragment();

    elements.forEach((elem) => {
        const span = document.createElement('span');
        span.textContent = elem;
        fragment.append(span);
    })

    testWord.append(fragment);
}

function checkWord(event) {
    if (!isTraining) {
        timerId = setInterval(updateTimer, 1000);
        isTraining = true;
    }

    const allSpan = document.querySelectorAll('.word span');
    const userEvent = event.key;

    if (userEvent === randomWord[index]) {
        allSpan[index].classList.remove('w');
        allSpan[index].classList.add('c');
        index++;
    }
    else {
        allSpan[index].classList.add('w');
        countWordMistakes++;
        wordMistakes.textContent = countWordMistakes;
        if (countWordMistakes === 1) {
            countWrongWords++;
            wrongWords.textContent = countWrongWords;
        }
    }

    if (index === randomWord.length) {
        if (countWordMistakes === 0) {
            countCorrectWords++;
            correctWords.textContent = countCorrectWords;
        }
        checkEndGame();
    }
}

function updateTimer() {
    seconds++;

    if (seconds > 59) {
        seconds = 0;
        minutes++;
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    timerDiv.textContent = `${minutes}:${seconds}`;
}

function resetInfo() {
    countCorrectWords = 0;
    countWrongWords = 0;
    minutes = '00';
    seconds = '00';
    correctWords.textContent = countCorrectWords;
    wrongWords.textContent = countWrongWords;
    timerDiv.textContent = `00:00`;
    insertWord();
    isTraining = false;
}

function checkEndGame() {
    setTimeout(() => {
        insertWord();
        if (countCorrectWords === 5) {
            alert(`Победа! Ваш результат ${timerDiv.textContent}`);
            clearInterval(timerId);
            resetInfo();
        }
        if (countWrongWords === 5) {
            alert(`Проигрыш! Ваш результат ${timerDiv.textContent}`);
            clearInterval(timerId);
            resetInfo();
        }
    }, 0);
}

insertWord();