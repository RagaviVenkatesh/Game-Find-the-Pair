var moves = 0;
var second = 0;
var minute = 0;
var hour = 0;
var interval;

const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let chosencard = [];

window.onload = startGame();

//var timer = document.querySelector(".timer");

function startGame() {
  moves = 0;
  //counter.innerHTML = moves;
  //document.getElementsByClassName('.moves').innerHTML = moves;
  //timer is set to 0
  second = 0;
  minute = 0;
  hour = 0;
  var time = "0 mins 0 secs";
  var ta = document.getElementById('time');
  ta.innerHTML = time;
  console.log(ta);
  clearInterval(interval);
  shuffle();
}

// Timer function initialization and definition
// The time parameters are set for the game

function startTimer() {
  interval = setInterval(function () {
    document.getElementById('time').innerHTML = minute + " mins " + second + " secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}


function flipCard() {
  chosencard.push(this);
  var flips = chosencard.length;

  if (flips == 1) {
    startTimer();
  }
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
    return;
  });
}