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
const MAX_TIMER = 60;
const MAX_QUESTIONS = 10;
const MAX_ANSWERS = 5;
const PENALTY = 15;
const REWARD = 10;

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
var quizObj = [];
var isQuizLoaded = false;
var questionNumber = 0;

// Initialize timer
function startTimer() {
    timeLeft = MAX_TIMER;
    timerEl.textContent = timeLeft;
    loadNextQuestion();
    timer = setInterval(function () {
        // Decrease timeLeft by 1 second
        updateTimeLeft(-1);
    }, 1000);
}

// Stop timer
function stopTimer() {
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
        // hideElement(mainDiv);
        // showElement(submitScoreDiv);
    }
}

// Init quiz
// Full credit to W3Schools.com (https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS)
function initQuiz() {
    // Question 1
    questionObj = {
        question: "Inside which HTML element do we put the JavaScript?",
        possibleAnswers: [
            "<javascript>",
            "<script>",
            "<scripting>",
            "<js>",
        ],
        correctAnswer: "2",
    };
    quizObj.push(questionObj);

    // Question 2
    questionObj = {
        question: "Where is the correct place to insert a JavaScript?",
        possibleAnswers: [
            "The <body> section",
            "Both the <head> section and the <body> section are correct",
            "The <head> section",
        ],
        correctAnswer: "2",
    };
    quizObj.push(questionObj);

    // Question 3
    questionObj = {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        possibleAnswers: [
            "<script href='xxx.js'>",
            "<script name='xxx.js>",
            "<script src='xxx.js'>",
        ],
        correctAnswer: "1",
    };
    quizObj.push(questionObj);

    // Question 4
    questionObj = {
        question: "The external JavaScript file must contain the <script> tag.",
        possibleAnswers: ["False", "True"],
        correctAnswer: "1",
    };
    quizObj.push(questionObj);

    // Question 5
    questionObj = {
        question: "How do you write 'Hello World' in an alert box?",
        possibleAnswers: [
            "msg('Hello World')",
            "msgBox('Hello World')",
            "alert('Hello World')",
            "alertBox('Hello World')",
        ],
        correctAnswer: "3",
    };
    quizObj.push(questionObj);

    // Question 6
    questionObj = {
        question: "How do you create a function in JavaScript?",
        possibleAnswers: [
            "function:myFunction()",
            "function myFunction()",
            "function = myFunction()",
        ],
        correctAnswer: "2",
    };
    quizObj.push(questionObj);

    // Question 7
    questionObj = {
        question: "How do you call a function named 'myFunction'?",
        possibleAnswers: [
            "call function myFunction()",
            "call myFunction()",
            "myFunction()",
        ],
        correctAnswer: "3",
    };
    quizObj.push(questionObj);

    // Question 8
    questionObj = {
        question: "How to write an IF statement in JavaScript?",
        possibleAnswers: [
            "if i = 5 then",
            "if (i == 5)",
            "if i == 5 then",
            "if i = 5",
        ],
        correctAnswer: "2",
    };
    quizObj.push(questionObj);

    // Question 9
    questionObj = {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        possibleAnswers: [
            "if (i <> 5)",
            "if (i != 5)",
            "if i <> 5",
            "if i =! 5 then",
        ],
        correctAnswer: "2",
    };
    quizObj.push(questionObj);

    // Question 10
    questionObj = {
        question: "How does a WHILE loop start?",
        possibleAnswers: [
            "while (i <= 10)",
            "while i =1 to 10",
            "while (i <= 10; i++",
        ],
        correctAnswer: "1",
    };
    quizObj.push(questionObj);

    isQuizLoaded = true;
}

// Init quiz
function initQuiz1() {
    //
    var possibleAnswers = [];
    var rndAnswer;
    //
    for (var i = 0; i < MAX_QUESTIONS; i++) {
        //
        questionObj.question = "";
        questionObj.possibleAnswers = [];
        questionObj.correctAnswer = "";

        questionObj.question = "Question " + (i + 1);

        for (var j = 0; j < MAX_ANSWERS; j++) {
            questionObj.possibleAnswers[j] =
                "Answer [" + (i + 1) + "," + (j + 1) + "]";
        }

        rndAnswer = Math.floor(Math.random() * 5);
        questionObj.correctAnswer = rndAnswer;

        quizObj.push(questionObj);
    }

    //   console.log("quiz :>> " + JSON.stringify(quizObj));

    isQuizLoaded = true;
}

// Load next question
function loadNextQuestion() {
    var liEl;
    var btnEl;
    var spanEl;

    //
    questionEl.setAttribute("data-number", questionNumber + 1);
    questionEl.textContent =
        questionNumber + 1 + ". " + quizObj[questionNumber].question;
    liEl = document.createElement("li");
    //
    for (var j = 0; j < quizObj[questionNumber].possibleAnswers.length; j++) {
        //
        btnEl = document.createElement("button");
        //
        btnEl.setAttribute("class", "answer");
        btnEl.setAttribute("data-number", j + 1);
        btnEl.textContent = quizObj[questionNumber].possibleAnswers[j];
        //
        liEl.appendChild(btnEl);
    }

    //
    spanEl = document.createElement("span");
    spanEl.setAttribute("id", "message");
    spanEl.setAttribute("class", "message");
    spanEl.textContent = "";

    questionEl.appendChild(liEl);
    questionEl.appendChild(spanEl);

    questionNumber++;
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
    timeLeft = MAX_TIMER;
    timerEl.textContent = timeLeft;
    //
    if (!isQuizLoaded) {
        initQuiz();
    }
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
        if (questionNumber < quizObj.length) {
            // Load next question
            loadNextQuestion();
        } else {
            stopTimer();
            hideElement(mainDiv);
            showElement(submitScoreDiv);
        }
    }
});

// Init parameters
initParameters();