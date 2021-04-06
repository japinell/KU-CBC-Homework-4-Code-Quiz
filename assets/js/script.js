// Section elements
const superHeaderDiv = document.getElementById(".super-header");
const headerDiv = document.querySelector(".header");
const introDiv = document.querySelector(".intro");
const mainDiv = document.querySelector(".main");
const submitScoreDiv = document.querySelector(".submitscore");
const scoresDiv = document.querySelector(".scores");

// Submit score elements
const initialsTxt = document.getElementById("initials");

// Button handlers
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const scoreBtn = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Timer element
const timerEl = document.getElementById("countdown");

// Question element
const questionEl = document.getElementById("question");

// Answer element
const answerEl = document.querySelectorAll(".answer");

//
const maxTimer = 3;

// Variables
var timeLeft = maxTimer;
var timer;

// Question object
var questionObj = {
  question: "",
  possibleAnswers: [],
  correctAnswer: "",
};

// Score object
var scoreObj = {
  initials: "",
  score: "",
};

// Quiz
var quiz = [];

// Initialize timer
function startTimer() {
  timerEl.textContent = timeLeft;
  timer = setInterval(function () {
    // Decrease timeLeft by 1 second
    updateTimeLeft(-1);
  }, 1000);
}

// Stop timer
function stopTimer() {
  startBtn.disabled = false;
  timeLeft = maxTimer;
  timerEl.textContent = timeLeft;
  clearInterval(timer);
}

// Update time left
function updateTimeLeft(seconds) {
  timeLeft = timeLeft + seconds;

  if (timeLeft > 0) {
    timerEl.textContent = timeLeft;
  } else {
    timerEl.textContent = "0";
    clearInterval(timer);
    hideSection(mainDiv);
    showSection(submitScoreDiv);
  }
}

// Hide section
function hideSection(section) {
  section.style.display = "none";
}

// Show section
function showSection(section) {
  section.style.display = "block";
}

// Init quiz parameters
function initParameters() {
  hideSection(mainDiv);
  hideSection(submitScoreDiv);
  hideSection(scoresDiv);
  //
  timerEl.textContent = timeLeft;
  //
}

// Submit score
function submitScore() {
  var actualInitials = initialsTxt.value.trim();
  var actualScore = 65;
  var savedScore;

  // Retrive the highest score
  savedScore = JSON.parse(localStorage.getItem("highestScore"));

  if (savedScore !== null) {
    // Compare the highest score to the actual one
    if (savedScore.score < actualScore) {
      scoreObj.initials = actualInitials;
      scoreObj.score = actualScore;

      // Save the actual score
      localStorage.setItem("highestScore", JSON.stringify(scoreObj));
    }
  } else {
    scoreObj.initials = actualInitials;
    scoreObj.score = actualScore;

    // Save the actual score
    localStorage.setItem("highestScore", JSON.stringify(scoreObj));
  }
}

// Event listeners
startBtn.addEventListener("click", function () {
  startBtn.disabled = true;
  hideSection(introDiv);
  showSection(mainDiv);
  startTimer();
});

stopBtn.addEventListener("click", function () {
  stopTimer();
});

submitBtn.addEventListener("click", function () {
  submitScore();
  hideSection(submitScoreDiv);
  showSection(scoresDiv);
});

questionEl.addEventListener("click", function () {
  // Check that the clicked element is an answer
  var element = event.target;

  if (element.matches(".answer")) {
    // timeLeft--;
    // timerEl.textContent = timeLeft;
    console.log(element.innerText);
  }
});

// Init parameters
initParameters();
