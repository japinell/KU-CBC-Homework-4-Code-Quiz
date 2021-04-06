// Section elements
const superHeaderDiv = document.getElementById(".superheader");
const headerDiv = document.querySelector(".header");
const introDiv = document.querySelector(".intro");
const mainDiv = document.querySelector(".main");
const submitScoreDiv = document.querySelector(".submitscore");
const scoresDiv = document.querySelector(".scores");

const initialsTxt = document.getElementById("initials");
const highestScoreTxt = document.getElementById("highestscore");

// Button handlers
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const restartBtn = document.getElementById("restart");
const scoresBtn = document.getElementById("scores");
const submitBtn = document.getElementById("submit");
const goBackBtn = document.getElementById("goback");
const clearScoresBtn = document.getElementById("clearscores");

// Timer element
const timerEl = document.getElementById("countdown");

// Question element
const questionEl = document.getElementById("question");

// Answer element
const answerEl = document.querySelectorAll(".answer");

//
const maxTimer = 3;

// Variables
var timeLeft;
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
    timeLeft = maxTimer;
  timerEl.textContent = timeLeft;
  timer = setInterval(function () {
    // Decrease timeLeft by 1 second
    updateTimeLeft(-1);
  }, 1000);
}

// Stop timer
function stopTimer() {
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
    hideElement(mainDiv);
    showElement(submitScoreDiv);
  }
}

// Hide section
function hideElement(section) {
  section.style.display = "none";
}

// Show section
function showElement(section) {
  section.style.display = "block";
}

// Init quiz parameters
function initParameters() {
  hideElement(mainDiv);
  hideElement(submitScoreDiv);
  hideElement(scoresDiv);
  showElement(introDiv);
  //
  timeLeft = maxTimer;
  timerEl.textContent = timeLeft;
  //
}

// Submit score
function submitScore() {
  var actualInitials = initialsTxt.value.trim();
  var actualScore = 75;
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

// Load highest score
function loadHighestScore() {
  var savedScore;

  // Retrive the highest score
  savedScore = JSON.parse(localStorage.getItem("highestScore"));

  if (savedScore !== null) {
    // Display it
    highestScoreTxt.textContent =
      savedScore.initials + " - " + savedScore.score;
  } else {
    highestScoreTxt.textContent = "N/A";
  }
}

// Clear highest score
function clearHighestScore() {
  localStorage.removeItem("highestScore");
}

// Event listeners
startBtn.addEventListener("click", function () {
  hideElement(introDiv);
  hideElement(submitScoreDiv);
  hideElement(scoresDiv);
  showElement(mainDiv);  
  startTimer();
});

stopBtn.addEventListener("click", function () {
  stopTimer();
  //   hideElement(restartBtn);
});

scoresBtn.addEventListener("click", function () {
  hideElement(introDiv);
  hideElement(mainDiv);
  hideElement(submitScoreDiv);
  loadHighestScore();
  showElement(scoresDiv);
});

submitBtn.addEventListener("click", function () {
  submitScore();
  hideElement(submitScoreDiv);
  loadHighestScore();
  showElement(scoresDiv);
});

clearScoresBtn.addEventListener("click", function () {
  clearHighestScore();
  loadHighestScore();
});

goBackBtn.addEventListener("click", function () {
  hideElement(mainDiv);
  hideElement(submitScoreDiv);
  hideElement(scoresDiv);
  showElement(introDiv);
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
