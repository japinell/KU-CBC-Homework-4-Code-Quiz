// Button handlers
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const scoreBtn = document.getElementById("score");

// Timer element
const timerEl = document.getElementById("countdown");

// Question element
const questionEl = document.getElementById("question");

// Answer element
const answerEl = document.querySelectorAll(".answer");

// 
const maxTimer = 10;

// Variables
var timeLeft = maxTimer;
var timer;

// Question object
var questionObj = {
    question: "",
    possibleAnswers: [],
    correctAnswer: "",
} 

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

// Update time left
function updateTimeLeft(seconds) {
    timeLeft = timeLeft + seconds;
    
    if (timeLeft > 0) {
        timerEl.textContent = timeLeft;
    } else {
        startBtn.disabled = false;
        timeLeft = maxTimer;
        timerEl.textContent = "0";
        clearInterval(timer);
    }
}

// Stop timer
function stopTimer() {
    startBtn.disabled = false;
    timeLeft = maxTimer;
    timerEl.textContent = timeLeft;
    clearInterval(timer);
}

// Event listeners
startBtn.addEventListener("click", function () {
    startBtn.disabled = true;
    startTimer();
});

stopBtn.addEventListener("click", function () {
    stopTimer();
});

questionEl.addEventListener("click", function () {
    // Check that the clicked element is an answer
    var element = event.target;

    if (element.matches(".answer")) {
        timeLeft--;
        timerEl.textContent = timeLeft;
    }
})